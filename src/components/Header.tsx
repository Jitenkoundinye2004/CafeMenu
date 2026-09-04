import React from 'react';
import { Search, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC<{ showBack?: boolean; title?: string }> = ({ showBack, title }) => {
  const navigate = useNavigate();
  // We can get the table from URL directly if needed, or just default
  const tableNumber = new URLSearchParams(window.location.search).get('table') || '12';

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-cafebrown-200 w-full">
      <div className="flex items-center justify-between px-4 h-16 w-full">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-cafebrown-100 active:bg-cafebrown-200 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          ) : (
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-secondary">
              <Coffee size={24} strokeWidth={1.5} />
            </div>
          )}
          
          <div className="flex flex-col">
            <h1 className="font-serif text-lg font-bold leading-tight text-primary">
              {title || 'Brew & Bean'}
            </h1>
            {!showBack && (
              <span className="text-xs text-cafebrown-600 font-medium">Table {tableNumber} • <span className="text-green-600">Open</span></span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={() => navigate('/search')} className="p-2 rounded-full text-primary hover:bg-cafebrown-100 transition-colors">
            <Search size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
};
