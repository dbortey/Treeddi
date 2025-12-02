import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { Item } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TopLikedSliderProps {
  items: Item[];
  likedItems: Set<string>;
  onLikeItem: (itemId: string) => void;
  onTradeClick: (item: Item) => void;
}

export function TopLikedSlider({ items, likedItems, onLikeItem, onTradeClick }: TopLikedSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll
  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div 
      className="mb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-500" />
        <h3 className="text-white">Most Popular</h3>
      </div>

      <div className="relative bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-0"
          >
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-auto bg-neutral-800">
              <ImageWithFallback
                src={currentItem.image}
                alt={currentItem.name}
                className="w-full h-full object-cover"
              />
              
              {/* Like overlay */}
              <button
                onClick={() => onLikeItem(currentItem.id)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors group"
              >
                <Heart
                  className={`w-6 h-6 transition-all ${
                    likedItems.has(currentItem.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-white group-hover:scale-110'
                  }`}
                />
              </button>

              {/* Navigation Arrows */}
              {items.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Indicators */}
              {items.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentIndex
                          ? 'bg-emerald-500 w-6'
                          : 'bg-white/50 w-2'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white mb-2">{currentItem.name}</h3>
                    <p className="text-neutral-400 mb-4">{currentItem.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-400">
                    {currentItem.category}
                  </span>
                  <span className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-400">
                    {currentItem.condition}
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-sm text-emerald-400 flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-current" />
                    {currentItem.likes} likes
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                    {currentItem.ownerName.charAt(0)}
                  </div>
                  <span>{currentItem.ownerName}</span>
                </div>
              </div>

              <button
                onClick={() => onTradeClick(currentItem)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-5 h-5" />
                Request Trade
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}