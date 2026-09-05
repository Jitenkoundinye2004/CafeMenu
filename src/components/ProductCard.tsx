import React from 'react';
import type { MenuItem } from '../context/MenuContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  item: MenuItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${item.id}`)}
      className="flex gap-4 bg-surface p-4 rounded-2xl shadow-sm border border-cafebrown-100 active:scale-[0.98] transition-transform cursor-pointer"
    >
      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-cafebrown-50">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {item.isBestseller && (
          <div className="absolute top-0 left-0 bg-accent text-white text-[9px] font-bold px-2 py-0.5 rounded-br-lg z-10">
            BESTSELLER
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="font-serif font-bold text-base text-primary leading-tight">
              {item.name}
            </h3>
            <div className={`w-3 h-3 rounded-full border ${item.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center shrink-0 ml-2`}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
            </div>
          </div>
          <p className="text-xs text-cafebrown-500 mt-1 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-primary text-base">₹{item.price}</span>
        </div>
      </div>
    </div>
  );
};
