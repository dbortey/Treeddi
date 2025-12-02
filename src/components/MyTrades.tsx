import { TradeRequest } from '../App';
import { ArrowRightLeft, Clock, Package, XCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MyTradesProps {
  requests: TradeRequest[];
  inProgressTrades: TradeRequest[];
  onWithdraw: (requestId: string) => void;
}

export function MyTrades({ requests, inProgressTrades, onWithdraw }: MyTradesProps) {
  const getTimeRemaining = (timestamp: number) => {
    const timeSinceRequest = Date.now() - timestamp;
    const thirtyMinutes = 30 * 60 * 1000;
    const remaining = thirtyMinutes - timeSinceRequest;
    
    if (remaining <= 0) return null;
    
    const minutes = Math.ceil(remaining / 60000);
    return minutes;
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-white mb-2">My Trades</h2>
        <p className="text-neutral-400">Manage your active trade requests</p>
      </div>

      {/* In Progress Trades */}
      {inProgressTrades.length > 0 && (
        <div className="mb-8">
          <h3 className="text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-500" />
            In Progress ({inProgressTrades.length})
          </h3>
          <div className="space-y-4">
            {inProgressTrades.map(request => (
              <div key={request.id} className="bg-neutral-900 rounded-xl border border-purple-500/50 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white">Trade Awaiting Confirmation</h4>
                    <p className="text-neutral-400 text-sm">Both parties need to confirm</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <p className="text-neutral-400 text-sm mb-2">You're Trading</p>
                    <div className="flex gap-3">
                      <ImageWithFallback
                        src={request.itemOffered.image}
                        alt={request.itemOffered.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h5 className="text-white text-sm">{request.itemOffered.name}</h5>
                        <p className="text-neutral-500 text-xs">{request.itemOffered.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRightLeft className="w-6 h-6 text-purple-500" />
                  </div>

                  <div className="bg-neutral-800 rounded-lg p-4">
                    <p className="text-neutral-400 text-sm mb-2">You're Receiving</p>
                    <div className="flex gap-3">
                      <ImageWithFallback
                        src={request.itemRequested.image}
                        alt={request.itemRequested.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h5 className="text-white text-sm">{request.itemRequested.name}</h5>
                        <p className="text-neutral-500 text-xs">{request.itemRequested.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Requests */}
      <div>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-500" />
          Pending Requests ({requests.length})
        </h3>

        {requests.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900 rounded-2xl border border-neutral-800">
            <ArrowRightLeft className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
            <p className="text-neutral-500 mb-2">No active trade requests</p>
            <p className="text-neutral-600 text-sm">Browse items and request a trade to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map(request => {
              const remainingMinutes = getTimeRemaining(request.timestamp);
              const canWithdraw = remainingMinutes === null;

              return (
                <div key={request.id} className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="grid md:grid-cols-3 gap-4 items-center mb-4">
                        <div className="bg-neutral-800 rounded-lg p-4">
                          <p className="text-neutral-400 text-sm mb-2">Your Item</p>
                          <div className="flex gap-3">
                            <ImageWithFallback
                              src={request.itemOffered.image}
                              alt={request.itemOffered.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h5 className="text-white text-sm">{request.itemOffered.name}</h5>
                              <p className="text-neutral-500 text-xs">{request.itemOffered.category}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <ArrowRightLeft className="w-6 h-6 text-emerald-500" />
                        </div>

                        <div className="bg-neutral-800 rounded-lg p-4">
                          <p className="text-neutral-400 text-sm mb-2">Requested Item</p>
                          <div className="flex gap-3">
                            <ImageWithFallback
                              src={request.itemRequested.image}
                              alt={request.itemRequested.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h5 className="text-white text-sm">{request.itemRequested.name}</h5>
                              <p className="text-neutral-500 text-xs">
                                Owned by {request.itemRequested.ownerName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(request.timestamp).toLocaleDateString()} at{' '}
                            {new Date(request.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      {canWithdraw ? (
                        <button
                          onClick={() => onWithdraw(request.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Withdraw
                        </button>
                      ) : (
                        <div className="px-4 py-2 bg-neutral-800 text-neutral-500 border border-neutral-700 rounded-lg text-center">
                          <p className="text-xs mb-1">Withdraw available in</p>
                          <p className="text-sm">{remainingMinutes} min</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
