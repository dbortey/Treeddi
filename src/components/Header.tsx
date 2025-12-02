import { Plus, Package, Search, Menu, ArrowRightLeft, Sparkles } from 'lucide-react';
import { RippleButton } from './RippleButton';

interface HeaderProps {
  view: 'browse' | 'my-items' | 'my-trades' | 'find';
  onViewChange: (view: 'browse' | 'my-items' | 'my-trades' | 'find') => void;
  onAddClick: () => void;
  onToggleSidebar: () => void;
}

export function Header({ view, onViewChange, onAddClick, onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50 backdrop-blur-sm bg-neutral-900/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button
              onClick={onToggleSidebar}
              className="text-neutral-400 hover:text-white transition-colors lg:block"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <h1 className="text-emerald-400 tracking-wider">TREEDDI</h1>
            
            <nav className="hidden md:flex gap-1">
              <button
                onClick={() => onViewChange('browse')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  view === 'browse'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                <Search className="w-4 h-4" />
                Browse
              </button>
              <button
                onClick={() => onViewChange('my-items')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  view === 'my-items'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                <Package className="w-4 h-4" />
                My Items
              </button>
              <button
                onClick={() => onViewChange('my-trades')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  view === 'my-trades'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                <ArrowRightLeft className="w-4 h-4" />
                My Trades
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <RippleButton
              onClick={() => onViewChange('find')}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Find</span>
            </RippleButton>
            
            <RippleButton
              onClick={onAddClick}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Up Treed</span>
            </RippleButton>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden flex gap-1 pb-3 overflow-x-auto">
          <button
            onClick={() => onViewChange('browse')}
            className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'browse'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Search className="w-4 h-4" />
            Browse
          </button>
          <button
            onClick={() => onViewChange('my-items')}
            className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'my-items'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Package className="w-4 h-4" />
            My Items
          </button>
          <button
            onClick={() => onViewChange('my-trades')}
            className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'my-trades'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            Trades
          </button>
        </nav>
      </div>
    </header>
  );
}