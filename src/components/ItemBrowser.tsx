import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Item } from '../App';
import { ItemCard } from './ItemCard';
import { ItemDetailView } from './ItemDetailView';
import { TopLikedSlider } from './TopLikedSlider';

interface ItemBrowserProps {
  items: Item[];
  myItems: Item[];
  likedItems: Set<string>;
  onTradeRequest: (offeredItemId: string, requestedItem: Item) => void;
  onLikeItem: (itemId: string) => void;
}

const categories = ['All', 'Electronics', 'Clothing', 'Music', 'Sports', 'Appliances', 'Books', 'Other'];

export function ItemBrowser({ items, myItems, likedItems, onTradeRequest, onLikeItem }: ItemBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const topLikedItems = [...items].sort((a, b) => b.likes - a.likes).slice(0, 3);

  const handleTradeClick = (item: Item) => {
    if (myItems.length === 0) {
      alert('You need to list an item before you can request a trade!');
      return;
    }
    setSelectedItem(item);
  };

  return (
    <div>
      {/* Top Liked Items Slider */}
      <TopLikedSlider 
        items={topLikedItems} 
        likedItems={likedItems}
        onLikeItem={onLikeItem}
        onTradeClick={handleTradeClick}
      />

      <div className="mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-neutral-500 flex-shrink-0" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-500 text-neutral-950'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500">No items found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              isLiked={likedItems.has(item.id)}
              onTradeClick={() => handleTradeClick(item)}
              onLikeClick={() => onLikeItem(item.id)}
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemDetailView
          item={selectedItem}
          myItems={myItems}
          isLiked={likedItems.has(selectedItem.id)}
          onClose={() => setSelectedItem(null)}
          onTradeRequest={onTradeRequest}
          onLikeClick={() => onLikeItem(selectedItem.id)}
        />
      )}
    </div>
  );
}