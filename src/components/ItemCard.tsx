import { ArrowRightLeft, User, Heart } from 'lucide-react';
import { Item } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ItemCardProps {
  item: Item;
  isLiked: boolean;
  onTradeClick: () => void;
  onLikeClick: () => void;
}

export function ItemCard({ item, isLiked, onTradeClick, onLikeClick }: ItemCardProps) {
  return (
    <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-emerald-500/50 transition-all group">
      <div className="aspect-square overflow-hidden bg-neutral-800 relative">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLikeClick();
          }}
          className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${
              isLiked
                ? 'fill-red-500 text-red-500'
                : 'text-white'
            }`}
          />
        </button>
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-white mb-1 text-sm sm:text-base truncate">{item.name}</h3>
            <p className="text-neutral-400 text-xs sm:text-sm line-clamp-2">{item.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 mb-3 text-xs sm:text-sm flex-wrap">
          <span className="px-2 py-0.5 sm:py-1 bg-neutral-800 rounded text-xs text-neutral-300">{item.category}</span>
          <span className="px-2 py-0.5 sm:py-1 bg-neutral-800 rounded text-xs text-neutral-300">{item.condition}</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <Heart className="w-3 h-3 fill-current" />
            <span className="text-xs">{item.likes}</span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-800 gap-2">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-neutral-400 min-w-0">
            <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{item.ownerName}</span>
          </div>

          <button
            onClick={onTradeClick}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 rounded-lg transition-colors text-xs sm:text-sm flex-shrink-0"
          >
            <ArrowRightLeft className="w-4 h-4 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Trade</span>
          </button>
        </div>
      </div>
    </div>
  );
}