import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import { ProductCard } from '../components/ProductCard';
import { cn } from '../utils/cn';

export const MenuCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { categories, menuItems, loading } = useMenu();

  // Scroll active category into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [categoryId, categories.length]);

  if (loading && categories.length === 0) {
    return (
      <div className="p-4 space-y-4">
        <div className="h-10 w-full rounded-full bg-cafebrown-200 animate-pulse" />
        <div className="space-y-4 pt-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-28 rounded-2xl bg-cafebrown-100 animate-pulse border border-cafebrown-200" />
          ))}
        </div>
      </div>
    );
  }

  const activeCategory = categories.find(c => c.id === categoryId);
  if (!activeCategory && categories.length > 0) {
    return <Navigate to={`/menu/${categories[0].id}`} replace />;
  }

  if (!activeCategory) return null;

  const items = menuItems.filter(item => item.categoryId === activeCategory.id);

  return (
    <div className="pb-24 flex flex-col h-[calc(100vh-64px)] w-full">
      {/* Category Nav */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-2 pb-3 border-b border-cafebrown-200 w-full">
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4"
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory.id;
            return (
              <button
                key={cat.id}
                data-active={isActive}
                onClick={() => navigate(`/menu/${cat.id}`)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  isActive 
                    ? "bg-primary text-white" 
                    : "bg-surface text-cafebrown-600 border border-cafebrown-200 hover:bg-cafebrown-50"
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Header */}
      <div className="px-4 py-6 bg-surface mb-2">
        <h2 className="font-serif text-3xl font-bold text-primary mb-2">{activeCategory.name}</h2>
        <p className="text-cafebrown-500 text-sm">{activeCategory.description}</p>
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-4 py-4">
          {items.length > 0 ? (
            items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))
          ) : (
            <div className="text-center py-12 text-cafebrown-400">
              <p>Items coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
