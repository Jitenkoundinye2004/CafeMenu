import React from 'react';
import { Home, LayoutGrid, Search, Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutGrid, label: 'Menu', path: '/menu/coffee' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Info, label: 'Info', path: '/info' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-cafebrown-100 pb-safe w-full">
      <div className="flex justify-around items-center h-16 px-2 w-full">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-full space-y-1 text-cafebrown-400 transition-colors",
              isActive(item.path) && "text-primary"
            )}
          >
            <item.icon size={24} strokeWidth={isActive(item.path) ? 2 : 1.5} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
