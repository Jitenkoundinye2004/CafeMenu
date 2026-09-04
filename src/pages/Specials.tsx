import React from 'react';
import { useMenu } from '../context/MenuContext';
import { ProductCard } from '../components/ProductCard';
import { Header } from '../components/Header';

export const Specials: React.FC = () => {
  const { menuItems, loading } = useMenu();

  if (loading) {
    return <div className="p-8 text-center mt-20 text-cafebrown-500">Loading specials...</div>;
  }

  // Derive specials
  const specialIds = ['c-8', 'p-2', 'd-3', 'b-6'];
  const specials = menuItems.filter(item => specialIds.includes(item.id));

  return (
    <div className="min-h-screen bg-surface pb-32">
      <Header showBack title="Today's Specials" />
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="font-serif text-3xl font-bold text-primary mb-2">Chef's Picks</h2>
          <p className="text-cafebrown-500 text-sm">Handcrafted specials curated just for you today.</p>
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
