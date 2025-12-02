import { useState } from 'react';
import { Header } from './components/Header';
import { ItemBrowser } from './components/ItemBrowser';
import { AddItemModal } from './components/AddItemModal';
import { MyItems } from './components/MyItems';
import { MyTrades } from './components/MyTrades';
import { FindPage } from './components/FindPage';
import { TradeAnimation } from './components/TradeAnimation';
import { TradeConfirmation } from './components/TradeConfirmation';
import { Sidebar } from './components/Sidebar';
import { RequestSentPopup } from './components/RequestSentPopup';
import { BackgroundBoxes } from './components/BackgroundBoxes';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  condition: string;
  image: string;
  images?: string[];
  specs?: { [key: string]: string };
  ownerId: string;
  ownerName: string;
  likes: number;
  isInTrade?: boolean;
}

export interface TradeRequest {
  id: string;
  itemOffered: Item;
  itemRequested: Item;
  requesterId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'in-progress';
  timestamp: number;
}

export interface TradeConfirmationData {
  trade: TradeRequest;
  isOwner: boolean;
  onConfirm: () => void;
}

// Mock current user
const CURRENT_USER_ID = 'user-1';
const CURRENT_USER_NAME = 'You';

// Mock items with likes and multiple images
const mockItems: Item[] = [
  {
    id: '1',
    name: 'Vintage Camera',
    description: 'Classic 35mm film camera in excellent condition. Perfect for photography enthusiasts.',
    category: 'Electronics',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'
    ],
    specs: {
      'Brand': 'Canon',
      'Type': '35mm Film',
      'Condition': 'Good',
      'Year': '1985'
    },
    ownerId: 'user-2',
    ownerName: 'Sarah M.',
    likes: 42
  },
  {
    id: '2',
    name: 'Leather Jacket',
    description: 'Genuine leather jacket, size M. Worn but well-maintained.',
    category: 'Clothing',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800'
    ],
    specs: {
      'Material': 'Genuine Leather',
      'Size': 'M',
      'Color': 'Black',
      'Brand': 'Vintage'
    },
    ownerId: 'user-3',
    ownerName: 'Mike D.',
    likes: 28
  },
  {
    id: '3',
    name: 'Electric Guitar',
    description: 'Fender Stratocaster, great sound. Minor scratches.',
    category: 'Music',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800',
    images: [
      'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800',
      'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800'
    ],
    specs: {
      'Brand': 'Fender',
      'Model': 'Stratocaster',
      'Type': 'Electric',
      'Color': 'Sunburst'
    },
    ownerId: 'user-4',
    ownerName: 'Alex K.',
    likes: 67
  },
  {
    id: '4',
    name: 'Mountain Bike',
    description: '21-speed mountain bike, recently serviced.',
    category: 'Sports',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800',
    images: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800'
    ],
    specs: {
      'Type': 'Mountain Bike',
      'Gears': '21-speed',
      'Frame': 'Aluminum',
      'Wheel Size': '26"'
    },
    ownerId: 'user-5',
    ownerName: 'Jordan P.',
    likes: 35
  },
  {
    id: '5',
    name: 'Espresso Machine',
    description: 'Professional-grade espresso maker. Makes perfect coffee every time.',
    category: 'Appliances',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
      'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800'
    ],
    specs: {
      'Type': 'Espresso Machine',
      'Pressure': '15 bar',
      'Capacity': '1.5L',
      'Power': '1450W'
    },
    ownerId: 'user-6',
    ownerName: 'Emma R.',
    likes: 51
  },
  {
    id: '6',
    name: 'Skateboard',
    description: 'Custom skateboard with new wheels and bearings.',
    category: 'Sports',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800',
    images: [
      'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800',
      'https://images.unsplash.com/photo-1564982752979-3f7bc974b7c0?w=800'
    ],
    specs: {
      'Deck': 'Maple Wood',
      'Wheels': 'Premium Urethane',
      'Bearings': 'ABEC-9',
      'Width': '8"'
    },
    ownerId: 'user-7',
    ownerName: 'Tyler B.',
    likes: 19
  }
];

export default function App() {
  const [view, setView] = useState<'browse' | 'my-items' | 'my-trades' | 'find'>('browse');
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState<Item[]>(mockItems);
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [tradeRequests, setTradeRequests] = useState<TradeRequest[]>([]);
  const [animatingTrade, setAnimatingTrade] = useState<TradeRequest | null>(null);
  const [confirmingTrade, setConfirmingTrade] = useState<TradeConfirmationData | null>(null);
  const [showRequestSent, setShowRequestSent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAddItem = (item: Omit<Item, 'id' | 'ownerId' | 'ownerName' | 'likes'>) => {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
      ownerId: CURRENT_USER_ID,
      ownerName: CURRENT_USER_NAME,
      likes: 0
    };
    setMyItems([...myItems, newItem]);
    setItems([...items, newItem]);
    setShowAddModal(false);
  };

  const handleLikeItem = (itemId: string) => {
    const newLiked = new Set(likedItems);
    const isLiked = newLiked.has(itemId);
    
    if (isLiked) {
      newLiked.delete(itemId);
    } else {
      newLiked.add(itemId);
    }
    
    setLikedItems(newLiked);
    
    // Update like count
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, likes: item.likes + (isLiked ? -1 : 1) }
        : item
    ));
  };

  const handleTradeRequest = (offeredItemId: string, requestedItem: Item) => {
    const offeredItem = [...items, ...myItems].find(i => i.id === offeredItemId);
    if (!offeredItem) return;

    const newRequest: TradeRequest = {
      id: Date.now().toString(),
      itemOffered: offeredItem,
      itemRequested: requestedItem,
      requesterId: CURRENT_USER_ID,
      status: 'pending',
      timestamp: Date.now()
    };

    setTradeRequests([...tradeRequests, newRequest]);
    
    // Mark item as in trade
    setMyItems(myItems.map(item => 
      item.id === offeredItemId ? { ...item, isInTrade: true } : item
    ));
    
    setShowRequestSent(true);
  };

  const handleWithdrawTrade = (requestId: string) => {
    const request = tradeRequests.find(r => r.id === requestId);
    if (!request) return;

    const timeSinceRequest = Date.now() - request.timestamp;
    const thirtyMinutes = 30 * 60 * 1000;

    if (timeSinceRequest < thirtyMinutes) {
      const remainingTime = Math.ceil((thirtyMinutes - timeSinceRequest) / 60000);
      alert(`You can withdraw this trade in ${remainingTime} minutes`);
      return;
    }

    setTradeRequests(tradeRequests.filter(req => req.id !== requestId));
    
    // Remove in-trade flag
    setMyItems(myItems.map(item => 
      item.id === request.itemOffered.id ? { ...item, isInTrade: false } : item
    ));
  };

  const handleRejectTrade = (requestId: string) => {
    setTradeRequests(tradeRequests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const handleRejectAll = (itemId: string) => {
    setTradeRequests(tradeRequests.map(req =>
      req.itemRequested.id === itemId ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const handleAcceptTrade = (request: TradeRequest) => {
    setTradeRequests(tradeRequests.map(req => 
      req.id === request.id ? { ...req, status: 'in-progress' as const } : req
    ));
    setAnimatingTrade(request);
  };

  const handleAnimationComplete = () => {
    if (!animatingTrade) return;
    
    setAnimatingTrade(null);
    setConfirmingTrade({
      trade: animatingTrade,
      isOwner: true,
      onConfirm: () => handleOwnerConfirm(animatingTrade)
    });
  };

  const handleOwnerConfirm = (trade: TradeRequest) => {
    setConfirmingTrade({
      trade,
      isOwner: false,
      onConfirm: () => handleRequesterConfirm(trade)
    });
  };

  const handleRequesterConfirm = (trade: TradeRequest) => {
    // Remove traded items and update requests
    setMyItems(myItems.filter(item => item.id !== trade.itemRequested.id));
    setItems(items.filter(item => 
      item.id !== trade.itemRequested.id && item.id !== trade.itemOffered.id
    ));
    setTradeRequests(tradeRequests.filter(req => req.id !== trade.id));
    setConfirmingTrade(null);
  };

  const myActiveRequests = tradeRequests.filter(
    req => req.requesterId === CURRENT_USER_ID && req.status === 'pending'
  );
  
  const inProgressTrades = tradeRequests.filter(req => req.status === 'in-progress');
  
  const incomingRequests = tradeRequests.filter(
    req => req.itemRequested.ownerId === CURRENT_USER_ID && req.status === 'pending'
  );

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {view === 'browse' && <BackgroundBoxes />}
      
      <Header 
        view={view} 
        onViewChange={setView}
        onAddClick={() => setShowAddModal(true)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <main className="flex-1 min-w-0 relative z-10">
              {view === 'browse' && (
                <ItemBrowser 
                  items={items.filter(item => item.ownerId !== CURRENT_USER_ID)}
                  myItems={myItems}
                  likedItems={likedItems}
                  onTradeRequest={handleTradeRequest}
                  onLikeItem={handleLikeItem}
                />
              )}
              {view === 'my-items' && (
                <MyItems
                  items={myItems}
                  tradeRequests={tradeRequests.filter(
                    req => req.itemRequested.ownerId === CURRENT_USER_ID && req.status === 'pending'
                  )}
                  onRejectTrade={handleRejectTrade}
                  onRejectAll={handleRejectAll}
                  onAcceptTrade={handleAcceptTrade}
                />
              )}
              {view === 'my-trades' && (
                <MyTrades
                  requests={myActiveRequests}
                  inProgressTrades={inProgressTrades}
                  onWithdraw={handleWithdrawTrade}
                />
              )}
              {view === 'find' && <FindPage />}
            </main>

            {/* Sidebar - only show on browse page */}
            {view === 'browse' && (
              <Sidebar 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                globalStats={{
                  totalTrades: 1247,
                  activeTrades: inProgressTrades.length + tradeRequests.filter(r => r.status === 'pending').length,
                  totalUsers: 3842
                }}
              />
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
        />
      )}

      {animatingTrade && (
        <TradeAnimation
          trade={animatingTrade}
          onComplete={handleAnimationComplete}
        />
      )}

      {confirmingTrade && (
        <TradeConfirmation
          trade={confirmingTrade.trade}
          isOwner={confirmingTrade.isOwner}
          onConfirm={confirmingTrade.onConfirm}
        />
      )}
      
      {showRequestSent && (
        <RequestSentPopup onClose={() => setShowRequestSent(false)} />
      )}
    </div>
  );
}