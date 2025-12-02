import { useState, useEffect } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { Item } from '../App';

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (item: Omit<Item, 'id' | 'ownerId' | 'ownerName' | 'likes'>) => void;
}

const categories = ['Electronics', 'Clothing', 'Music', 'Sports', 'Appliances', 'Books', 'Other'];
const conditions = ['Excellent', 'Good', 'Fair'];

// Define required spec fields for each category
const categorySpecFields: { [key: string]: string[] } = {
  'Electronics': ['Brand', 'Model', 'Year', 'Condition Details'],
  'Clothing': ['Brand', 'Size', 'Material', 'Color'],
  'Music': ['Brand', 'Type', 'Condition Details', 'Includes'],
  'Sports': ['Brand', 'Type', 'Size/Specs', 'Condition Details'],
  'Appliances': ['Brand', 'Model', 'Power/Capacity', 'Year'],
  'Books': ['Author', 'Publisher', 'Year', 'ISBN'],
  'Other': ['Type', 'Brand/Maker', 'Condition Details', 'Material']
};

export function AddItemModal({ onClose, onAdd }: AddItemModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [condition, setCondition] = useState(conditions[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [requiredSpecs, setRequiredSpecs] = useState<{ [key: string]: string }>({});
  const [additionalSpecs, setAdditionalSpecs] = useState<{ key: string; value: string }[]>([]);

  // Initialize required specs when category changes
  useEffect(() => {
    const fields = categorySpecFields[category] || [];
    const initialSpecs: { [key: string]: string } = {};
    fields.forEach(field => {
      initialSpecs[field] = requiredSpecs[field] || '';
    });
    setRequiredSpecs(initialSpecs);
  }, [category]);

  const handleAddImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setAdditionalImages([...additionalImages, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const handleRequiredSpecChange = (field: string, value: string) => {
    setRequiredSpecs({
      ...requiredSpecs,
      [field]: value
    });
  };

  const handleAddAdditionalSpec = () => {
    setAdditionalSpecs([...additionalSpecs, { key: '', value: '' }]);
  };

  const handleAdditionalSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...additionalSpecs];
    newSpecs[index][field] = value;
    setAdditionalSpecs(newSpecs);
  };

  const handleRemoveAdditionalSpec = (index: number) => {
    setAdditionalSpecs(additionalSpecs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if all required specs are filled
    const missingSpecs = Object.entries(requiredSpecs).filter(([_, value]) => !value.trim());
    if (missingSpecs.length > 0) {
      alert(`Please fill in all required specifications: ${missingSpecs.map(([key]) => key).join(', ')}`);
      return;
    }

    const mainImage = imageUrl || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800';
    const images = [mainImage, ...additionalImages];
    
    // Combine required specs and additional specs
    const allSpecs: { [key: string]: string } = { ...requiredSpecs };
    additionalSpecs.forEach(spec => {
      if (spec.key && spec.value) {
        allSpecs[spec.key] = spec.value;
      }
    });

    onAdd({
      name,
      description,
      category,
      condition,
      image: mainImage,
      images,
      specs: Object.keys(allSpecs).length > 0 ? allSpecs : undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neutral-800">
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex items-center justify-between z-10">
          <h2 className="text-white">List New Item</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-neutral-400 mb-2">Item Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vintage Camera"
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item in detail..."
              rows={4}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-400 mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-neutral-400 mb-2">Condition *</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Required Specifications based on category */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-white mb-3">Required Specifications *</h3>
            <div className="space-y-3">
              {Object.entries(requiredSpecs).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-neutral-400 text-sm mb-1">{field}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleRequiredSpecChange(field, e.target.value)}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-neutral-400 mb-2">Main Image URL</label>
            <div className="relative">
              <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Additional Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-neutral-400">Additional Images</label>
              <button
                type="button"
                onClick={handleAddImage}
                className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </button>
            </div>
            {additionalImages.length > 0 && (
              <div className="space-y-2">
                {additionalImages.map((img, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={img}
                      readOnly
                      className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Specifications (optional) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-neutral-400">Additional Specifications (Optional)</label>
              <button
                type="button"
                onClick={handleAddAdditionalSpec}
                className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Spec
              </button>
            </div>
            {additionalSpecs.length > 0 && (
              <div className="space-y-2">
                {additionalSpecs.map((spec, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => handleAdditionalSpecChange(i, 'key', e.target.value)}
                      placeholder="e.g. Weight"
                      className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleAdditionalSpecChange(i, 'value', e.target.value)}
                      placeholder="e.g. 1.2kg"
                      className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAdditionalSpec(i)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 rounded-lg transition-colors"
          >
            List Item
          </button>
        </form>
      </div>
    </div>
  );
}
