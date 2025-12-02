import { useState } from 'react';
import { Search, DollarSign, Send } from 'lucide-react';
import { RippleButton } from './RippleButton';

const categories = ['Electronics', 'Clothing', 'Music', 'Sports', 'Appliances', 'Books', 'Other'];

export function FindPage() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [cashOffer, setCashOffer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your request has been posted! Item owners will be notified.');
    // Reset form
    setItemName('');
    setDescription('');
    setCategory(categories[0]);
    setCashOffer('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-white mb-2 flex items-center gap-3">
          <Search className="w-8 h-8 text-emerald-500" />
          Find an Item
        </h2>
        <p className="text-neutral-400">
          Looking for something specific? Post a request and item owners can trade with you for cash.
        </p>
      </div>

      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-neutral-400 mb-2">What are you looking for? *</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. Vintage Vinyl Player"
                className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-400 mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the item you're looking for, including specific features, condition, etc."
              rows={5}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-2">Category</label>
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
            <label className="block text-neutral-400 mb-2">Cash Offer (Optional)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="number"
                value={cashOffer}
                onChange={(e) => setCashOffer(e.target.value)}
                placeholder="How much are you willing to pay?"
                className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <p className="text-neutral-500 text-sm mt-1">
              Leave blank if you prefer to discuss pricing with the seller
            </p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
            <h4 className="text-emerald-400 mb-2">How it works</h4>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>• Your request will be visible to all item owners</li>
              <li>• Owners with matching items can contact you directly</li>
              <li>• You'll be notified when someone responds</li>
              <li>• Negotiate the final price and arrange the trade</li>
            </ul>
          </div>

          <RippleButton
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Post Request
          </RippleButton>
        </form>
      </div>

      {/* Example requests */}
      <div className="mt-12">
        <h3 className="text-white mb-4">Recent Requests</h3>
        <div className="space-y-3">
          {[
            { item: 'Vintage Polaroid Camera', offer: '$150', time: '2 hours ago' },
            { item: 'Gaming Laptop', offer: '$800', time: '5 hours ago' },
            { item: 'Electric Scooter', offer: 'Best Offer', time: '1 day ago' }
          ].map((request, i) => (
            <div key={i} className="bg-neutral-900 rounded-lg border border-neutral-800 p-4 flex items-center justify-between">
              <div>
                <h4 className="text-white mb-1">{request.item}</h4>
                <p className="text-neutral-500 text-sm">{request.time}</p>
              </div>
              <div className="text-emerald-400">{request.offer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
