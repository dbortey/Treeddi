import { useState } from 'react';
import { X, Heart, ArrowRightLeft, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Item } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RippleButton } from './RippleButton';

interface ItemDetailViewProps {
  item: Item;
  myItems: Item[];
  isLiked: boolean;
  onClose: () => void;
  onTradeRequest: (offeredItemId: string, requestedItem: Item) => void;
  onLikeClick: () => void;
}

export function ItemDetailView({ item, myItems, isLiked, onClose, onTradeRequest, onLikeClick }: ItemDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMyItem, setSelectedMyItem] = useState<string>('');
  const [showTradeConfirm, setShowTradeConfirm] = useState(false);

  const images = item.images || [item.image];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleRequestTrade = () => {
    if (selectedMyItem) {
      onTradeRequest(selectedMyItem, item);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
              <span>Close</span>
            </button>
            <button
              onClick={onLikeClick}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isLiked
                    ? 'fill-red-500 text-red-500'
                    : 'text-white'
                }`}
              />
              <span className="text-white">{item.likes}</span>
            </button>
          </div>

          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Gallery */}
              <div className="relative bg-neutral-800">
                <div className="aspect-square relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <ImageWithFallback
                        src={images[selectedImageIndex]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          i === selectedImageIndex
                            ? 'border-emerald-500'
                            : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${item.name} ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="p-8 flex flex-col">
                <div className="flex-1">
                  <h2 className="text-white mb-2">{item.name}</h2>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <User className="w-4 h-4" />
                      <span>{item.ownerName}</span>
                    </div>
                    <span className="text-neutral-600">•</span>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-400">
                        {item.category}
                      </span>
                      <span className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-400">
                        {item.condition}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-white mb-2">Description</h3>
                    <p className="text-neutral-400">{item.description}</p>
                  </div>

                  {/* Specs */}
                  {item.specs && Object.keys(item.specs).length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-white mb-3">Specifications</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(item.specs).map(([key, value]) => (
                          <div key={key} className="bg-neutral-800 rounded-lg p-3">
                            <p className="text-neutral-500 text-sm mb-1">{key}</p>
                            <p className="text-white text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* My Items Selection */}
                  {!showTradeConfirm ? (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white">Select your item to offer</h3>
                        <ArrowRightLeft className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
                        {myItems.length === 0 ? (
                          <p className="text-neutral-500 text-sm">You need to list an item first</p>
                        ) : (
                          myItems.map(myItem => (
                            <button
                              key={myItem.id}
                              onClick={() => setSelectedMyItem(myItem.id)}
                              className={`w-full flex gap-3 p-3 rounded-lg transition-all text-left ${
                                selectedMyItem === myItem.id
                                  ? 'bg-emerald-500/20 ring-2 ring-emerald-500'
                                  : 'bg-neutral-800 hover:bg-neutral-700'
                              }`}
                            >
                              <ImageWithFallback
                                src={myItem.image}
                                alt={myItem.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="text-white text-sm mb-1">{myItem.name}</h4>
                                <p className="text-neutral-400 text-xs line-clamp-2">
                                  {myItem.description}
                                </p>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Action Button */}
                <RippleButton
                  onClick={() => {
                    if (selectedMyItem) {
                      setShowTradeConfirm(true);
                      setTimeout(handleRequestTrade, 500);
                    } else {
                      alert('Please select an item to offer');
                    }
                  }}
                  disabled={!selectedMyItem}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-700 disabled:text-neutral-500 text-neutral-950 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                  Request Trade
                </RippleButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
