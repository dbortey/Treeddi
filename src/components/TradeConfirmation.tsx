import { motion } from 'motion/react';
import { TradeRequest } from '../App';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TradeConfirmationProps {
  trade: TradeRequest;
  isOwner: boolean;
  onConfirm: () => void;
}

export function TradeConfirmation({ trade, isOwner, onConfirm }: TradeConfirmationProps) {
  const itemToReceive = isOwner ? trade.itemOffered : trade.itemRequested;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-neutral-900 rounded-2xl max-w-lg w-full border border-neutral-800 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 p-6 text-center border-b border-neutral-800">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <CheckCircle className="w-16 h-16 text-emerald-500" />
          </motion.div>
          <h2 className="text-white mb-2">Trade Confirmed!</h2>
          <p className="text-neutral-400">Please review the item you'll receive</p>
        </div>

        <div className="p-6">
          <div className="bg-neutral-800 rounded-xl p-4 mb-6">
            <div className="flex gap-4">
              <ImageWithFallback
                src={itemToReceive.image}
                alt={itemToReceive.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-white mb-1">{itemToReceive.name}</h3>
                <p className="text-neutral-400 text-sm mb-2">{itemToReceive.description}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-neutral-900 rounded text-xs text-neutral-400">
                    {itemToReceive.category}
                  </span>
                  <span className="px-2 py-1 bg-neutral-900 rounded text-xs text-neutral-400">
                    {itemToReceive.condition}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-emerald-400 mb-1">Dispatch Information</p>
                <p className="text-neutral-400 text-sm">
                  A rider will contact you within 24 hours to:
                </p>
                <ul className="text-neutral-400 text-sm mt-2 space-y-1 ml-4">
                  <li className="flex items-center gap-2">
                    <Package className="w-3 h-3 text-emerald-500" />
                    Pick up your item
                  </li>
                  <li className="flex items-center gap-2">
                    <Package className="w-3 h-3 text-emerald-500" />
                    Deliver {itemToReceive.name}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={onConfirm}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 rounded-lg transition-colors"
          >
            Confirm Trade
          </button>
        </div>
      </motion.div>
    </div>
  );
}
