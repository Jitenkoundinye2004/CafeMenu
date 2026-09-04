import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

const combos = [
  { id: 'combo-1', name: 'Breakfast Combo', items: 'Cappuccino + Croissant', price: 299, image: 'https://images.unsplash.com/photo-1525640788966-69bdb028aa73?w=500&q=80' },
  { id: 'combo-2', name: 'Coffee & Cake', items: 'Latte + Chocolate Cake', price: 399, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 'combo-3', name: 'Lunch Combo', items: 'Pizza + Drink', price: 499, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80' },
  { id: 'combo-4', name: 'Friends Combo', items: '2 Burgers + Fries + 2 Drinks', price: 699, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
];

export const Combos: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface pb-32">
      <Header showBack title="Brew & Bean Combos" />
      
      <div className="p-4 space-y-4">
        {combos.map(combo => (
          <div key={combo.id} className="bg-white border border-cafebrown-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="h-32 relative">
              <img src={combo.image} alt={combo.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <h3 className="font-serif font-bold text-xl">{combo.name}</h3>
                <p className="text-sm opacity-90">{combo.items}</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="font-bold text-primary text-xl">₹{combo.price}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/menu')}>View Menu</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
