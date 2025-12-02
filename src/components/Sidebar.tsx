import { TrendingUp, Clock, Package, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  globalStats: {
    totalTrades: number;
    activeTrades: number;
    totalUsers: number;
  };
}

export function Sidebar({ isOpen, onClose, globalStats }: SidebarProps) {
  return (
    <>
      {/* Mobile Bottom Sheet */}
      {isOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 rounded-t-3xl z-50 animate-slide-up">
            <div className="p-6">
              {/* Handle bar */}
              <div className="w-12 h-1 bg-neutral-700 rounded-full mx-auto mb-6" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Platform Stats */}
              <div>
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
          </div>
        </>
      )}

      {/* Desktop Side Panel - Sticky */}
      <aside className="hidden lg:block sticky top-24 w-72 bg-neutral-900 border border-neutral-800 rounded-2xl self-start h-fit">
        <div className="p-6">
          {/* Platform Stats */}
          <div className="mb-6">
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
          </div>

          {/* Trading Tips */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-lg p-4">
            <h3 className="text-emerald-400 text-sm mb-3">Trading Tips</h3>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>• List detailed descriptions for better trades</li>
              <li>• Respond to requests within 24 hours</li>
              <li>• High ratings attract more traders</li>
              <li>• Upload multiple images to showcase items</li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}