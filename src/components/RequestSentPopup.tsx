import { motion } from 'motion/react';
import { CheckCircle2, Package, Truck, Clock, X } from 'lucide-react';

interface RequestSentPopupProps {
  onClose: () => void;
}

export function RequestSentPopup({ onClose }: RequestSentPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-neutral-900 rounded-2xl max-w-lg w-full border border-neutral-800 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 p-6 text-center border-b border-neutral-800">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <CheckCircle2 className="w-20 h-20 text-emerald-500" />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-emerald-500"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
          <h2 className="text-white mb-2">Request Sent!</h2>
          <p className="text-neutral-400">Your trade request has been submitted</p>
        </div>

        <div className="p-6">
          <h3 className="text-white mb-4">What happens next?</h3>
          
          <div className="space-y-4 mb-6">
            {/* Timeline */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-500">
                  <Clock className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="w-0.5 h-12 bg-neutral-700" />
              </div>
              <div className="flex-1 pt-2">
                <h4 className="text-white mb-1">Pending Review</h4>
                <p className="text-neutral-400 text-sm">
                  The item owner will review your request. You'll be notified when they respond.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-neutral-700">
                  <CheckCircle2 className="w-5 h-5 text-neutral-500" />
                </div>
                <div className="w-0.5 h-12 bg-neutral-700" />
              </div>
              <div className="flex-1 pt-2">
                <h4 className="text-neutral-400 mb-1">Trade Accepted</h4>
                <p className="text-neutral-500 text-sm">
                  If accepted, you'll see a beautiful swap animation and confirm the trade.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-neutral-700">
                  <Package className="w-5 h-5 text-neutral-500" />
                </div>
                <div className="w-0.5 h-12 bg-neutral-700" />
              </div>
              <div className="flex-1 pt-2">
                <h4 className="text-neutral-400 mb-1">Confirmation</h4>
                <p className="text-neutral-500 text-sm">
                  Both parties confirm the trade details before proceeding.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-neutral-700">
                  <Truck className="w-5 h-5 text-neutral-500" />
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h4 className="text-neutral-400 mb-1">Dispatch & Delivery</h4>
                <p className="text-neutral-500 text-sm">
                  A rider will contact you within 24 hours to arrange pickup and delivery.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> You can withdraw your trade request after 30 minutes from your "My Trades" page.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </div>
  );
}
