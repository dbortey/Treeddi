import { useEffect } from 'react';
import { motion } from 'motion/react';
import { TradeRequest } from '../App';
import { ArrowRightLeft } from 'lucide-react';

interface TradeAnimationProps {
  trade: TradeRequest;
  onComplete: () => void;
}

export function TradeAnimation({ trade, onComplete }: TradeAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-emerald-400 text-center mb-12"
        >
          Trade in Progress!
        </motion.h2>

        <div className="flex items-center justify-center gap-8 md:gap-16">
          {/* Item 1 - Moving right */}
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: [0, 100, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="flex-1 max-w-xs"
          >
            <div className="bg-neutral-900 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-lg shadow-emerald-500/20">
              <img
                src={trade.itemRequested.image}
                alt={trade.itemRequested.name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4">
                <h3 className="text-white mb-1">{trade.itemRequested.name}</h3>
                <p className="text-neutral-400 text-sm">{trade.itemRequested.ownerName}</p>
              </div>
            </div>
          </motion.div>

          {/* Center icon */}
          <motion.div
            animate={{ 
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut"
            }}
          >
            <div className="bg-emerald-500 p-6 rounded-full">
              <ArrowRightLeft className="w-8 h-8 text-neutral-950" />
            </div>
          </motion.div>

          {/* Item 2 - Moving left */}
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: [0, -100, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="flex-1 max-w-xs"
          >
            <div className="bg-neutral-900 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-lg shadow-emerald-500/20">
              <img
                src={trade.itemOffered.image}
                alt={trade.itemOffered.name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4">
                <h3 className="text-white mb-1">{trade.itemOffered.name}</h3>
                <p className="text-neutral-400 text-sm">{trade.itemOffered.ownerName}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="w-2 h-2 bg-emerald-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-emerald-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-emerald-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
