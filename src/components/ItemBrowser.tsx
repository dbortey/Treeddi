import { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, Package } from 'lucide-react';
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
  globalStats: {
    totalTrades: number;
    activeTrades: number;
    totalUsers: number;
  };
}

const categories = ['All', 'Electronics', 'Clothing', 'Music', 'Sports', 'Appliances', 'Books', 'Other'];

export function ItemBrowser({ items, myItems, likedItems, onTradeRequest, onLikeItem, globalStats }: ItemBrowserProps) {
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

      {/* Mobile Activity Section - shows after hero slider */}
      <div className="lg:hidden mb-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h3 className="text-neutral-400 text-sm uppercase tracking-wider mb-4">Platform Activity</h3>
        
        <div className="space-y-3">
          <div className="bg-neutral-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-neutral-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Total Trades</span>
              </div>
              <span className="text-white">{globalStats.totalTrades}</span>
            </div>
            <p className="text-xs text-neutral-500">Completed this month</p>
          </div>

          <div className="bg-neutral-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Active Now</span>
              </div>
              <span className="text-emerald-400">{globalStats.activeTrades}</span>
            </div>
            <p className="text-xs text-neutral-500">Trades in progress</p>
          </div>

          <div className="bg-neutral-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-neutral-400">
                <Package className="w-4 h-4" />
                <span className="text-sm">Community</span>
              </div>
              <span className="text-white">{globalStats.totalUsers}</span>
            </div>
            <p className="text-xs text-neutral-500">Active traders</p>
          </div>
        </div>

        {/* Trading Tips */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-lg p-4 mt-4">
          <h3 className="text-emerald-400 text-sm mb-3">Trading Tips</h3>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li>• List detailed descriptions for better trades</li>
            <li>• Respond to requests within 24 hours</li>
            <li>• High ratings attract more traders</li>
            <li>• Upload multiple images to showcase items</li>
          </ul>
        </div>
      </div>

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