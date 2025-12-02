import { Item } from '../App';
import { Bell, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MyItemCardProps {
  item: Item;
  requestCount: number;
}

export function MyItemCard({ item, requestCount }: MyItemCardProps) {
  return (
    <div className="p-6 flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white">{item.name}</h3>
          <div className="flex gap-2">
            {item.isInTrade && (
              <span className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                <TrendingUp className="w-4 h-4" />
                In Trade
              </span>
            )}
            {requestCount > 0 && (
              <span className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                <Bell className="w-4 h-4" />
                <span className="text-sm">{requestCount}</span>
              </span>
            )}
          </div>
        </div>
        <p className="text-neutral-400 mb-3">{item.description}</p>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-neutral-800 rounded text-sm text-neutral-400">
            {item.category}
          </span>
          <span className="px-3 py-1 bg-neutral-800 rounded text-sm text-neutral-400">
            {item.condition}
          </span>
        </div>
      </div>
    </div>
  );
}