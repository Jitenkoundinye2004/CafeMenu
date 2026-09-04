import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import { ProductCard } from '../components/ProductCard';
import { cn } from '../utils/cn';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categories, menuItems, loading } = useMenu();

  if (loading) {
    return <div className="p-8 text-center mt-20 text-cafebrown-500">Loading menu...</div>;
  }

  // Derived specials (e.g. specific IDs or just random ones for demo)
  const specialIds = ['c-8', 'p-2', 'd-3', 'b-6'];
  const specials = menuItems.filter(item => specialIds.includes(item.id));

  return (
    <div className="pb-24 w-full">
      {/* Hero Section */}
      <div className="relative h-64 w-full">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" 
          alt="Café Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent flex flex-col justify-end p-6 text-white">
          <h2 className="font-serif text-3xl font-bold mb-2 text-white">Good Coffee.<br/>Great Moments.</h2>
          <p className="text-sm text-cafebrown-100 mb-4 max-w-[280px]">
            Fresh coffee, handcrafted food and something sweet for every mood.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/menu/coffee')}
              className="bg-accent text-white px-5 py-2.5 rounded-xl font-medium text-sm active:scale-95 transition-transform"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => navigate('/specials')}
              className="bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-xl font-medium text-sm active:scale-95 transition-transform"
            >
              Today's Specials
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8 px-4">
        <h3 className="font-serif font-bold text-xl text-primary mb-4">Categories</h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x">
          {categories.map((cat, index) => {
            const isActive = index === 0;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/menu/${cat.id}`)}
                className={cn(
                  "snap-start shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap active:scale-95",
                  isActive 
                    ? "bg-primary text-white" 
                    : "bg-surface text-cafebrown-700 border border-cafebrown-200 hover:bg-cafebrown-50"
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trending / Specials */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-xl text-primary">Popular Now</h3>
        </div>
        <div className="flex flex-col gap-4">
          {specials.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
