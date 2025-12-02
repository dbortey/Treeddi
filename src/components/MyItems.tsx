import { Item, TradeRequest } from '../App';
import { Package, Clock } from 'lucide-react';
import { MyItemCard } from './MyItemCard';

interface MyItemsProps {
  items: Item[];
  tradeRequests: TradeRequest[];
  onRejectTrade: (requestId: string) => void;
  onRejectAll: (itemId: string) => void;
  onAcceptTrade: (request: TradeRequest) => void;
}

export function MyItems({ items, tradeRequests, onRejectTrade, onRejectAll, onAcceptTrade }: MyItemsProps) {
  const getRequestsForItem = (itemId: string) => {
    return tradeRequests.filter(req => req.itemRequested.id === itemId);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-white mb-2">My Listed Items</h2>
        <p className="text-neutral-400">Manage your items and view trade requests</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900 rounded-2xl border border-neutral-800">
          <Package className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
          <p className="text-neutral-500 mb-2">No items listed yet</p>
          <p className="text-neutral-600 text-sm">Click "List Item" to add your first item for trade</p>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map(item => {
            const requests = getRequestsForItem(item.id);
            return (
              <div key={item.id} className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
                <MyItemCard item={item} requestCount={requests.length} />
                
                {requests.length > 0 && (
                  <div className="border-t border-neutral-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white flex items-center gap-2">
                        <Clock className="w-5 h-5 text-emerald-500" />
                        Trade Requests ({requests.length})
                      </h3>
                      <button
                        onClick={() => onRejectAll(item.id)}
                        className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        Reject All
                      </button>
                    </div>

                    <div className="space-y-3">
                      {requests.map(request => (
                        <div
                          key={request.id}
                          className="bg-neutral-800 rounded-lg p-4 flex flex-col sm:flex-row gap-4"
                        >
                          <img
                            src={request.itemOffered.image}
                            alt={request.itemOffered.name}
                            className="w-full sm:w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-white mb-1">{request.itemOffered.name}</h4>
                            <p className="text-neutral-400 text-sm mb-2 line-clamp-2">
                              {request.itemOffered.description}
                            </p>
                            <div className="flex gap-2">
                              <span className="px-2 py-1 bg-neutral-900 rounded text-xs text-neutral-400">
                                {request.itemOffered.category}
                              </span>
                              <span className="px-2 py-1 bg-neutral-900 rounded text-xs text-neutral-400">
                                {request.itemOffered.condition}
                              </span>
                            </div>
                          </div>
                          <div className="flex sm:flex-col gap-2">
                            <button
                              onClick={() => onAcceptTrade(request)}
                              className="flex-1 sm:flex-none px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 rounded-lg transition-colors whitespace-nowrap"
                            >
                              Make Trade
                            </button>
                            <button
                              onClick={() => onRejectTrade(request.id)}
                              className="flex-1 sm:flex-none px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700 rounded-lg transition-colors whitespace-nowrap"
                            >
                              No Trade
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
