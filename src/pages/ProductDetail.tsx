import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import { Star, Clock, ArrowLeft } from 'lucide-react';
import { cn } from '../utils/cn';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { menuItems, loading } = useMenu();
  
  const item = menuItems.find(i => i.id === id);
  
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (item) {
      const initialSelections: Record<string, string[]> = {};
      item.customizations?.forEach(group => {
        if (group.type === 'single' && group.options.length > 0) {
          initialSelections[group.id] = [group.options[0].id];
        } else {
          initialSelections[group.id] = [];
        }
      });
      setSelections(initialSelections);
      setTotalPrice(item.price);
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;
    let extraPrice = 0;
    
    item.customizations?.forEach(group => {
      const selectedOptionIds = selections[group.id] || [];
      selectedOptionIds.forEach(optId => {
        const option = group.options.find(o => o.id === optId);
        if (option) {
          extraPrice += option.price;
        }
      });
    });

    setTotalPrice(item.price + extraPrice);
  }, [selections, item]);

  if (loading) {
    return <div className="p-8 text-center mt-20 text-cafebrown-500">Loading details...</div>;
  }

  if (!item) return <div className="p-4 mt-20 text-center">Item not found</div>;

  const handleOptionToggle = (groupId: string, optionId: string, isSingle: boolean) => {
    setSelections(prev => {
      const current = prev[groupId] || [];
      if (isSingle) {
        return { ...prev, [groupId]: [optionId] };
      } else {
        if (current.includes(optionId)) {
          return { ...prev, [groupId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [groupId]: [...current, optionId] };
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-surface pb-12 w-full">
      <div className="relative h-72 w-full bg-cafebrown-50">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-sm"
        >
          <ArrowLeft size={24} />
        </button>
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="px-5 py-6">
        <div className="flex items-start justify-between mb-2">
          <h1 className="font-serif text-3xl font-bold text-primary">{item.name}</h1>
          <div className={`w-4 h-4 mt-2 rounded-full border ${item.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center shrink-0`}>
            <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-cafebrown-600 mb-4">
          <span className="flex items-center gap-1 font-bold text-primary"><Star size={16} className="text-yellow-500 fill-yellow-500" /> {item.rating}</span>
          <span className="flex items-center gap-1"><Clock size={16} /> {item.prepTime}</span>
          <span className="font-bold text-primary ml-auto text-xl">₹{totalPrice}</span>
        </div>

        <p className="text-cafebrown-700 leading-relaxed mb-6">{item.description}</p>

        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mb-8">
            <h3 className="font-serif text-lg font-bold text-primary mb-3">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map(ing => (
                <span key={ing} className="bg-cafebrown-50 text-cafebrown-700 px-3 py-1 rounded-full text-sm font-medium">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {item.customizations && item.customizations.length > 0 && (
          <div className="space-y-8 mb-8">
            <h3 className="font-serif text-xl font-bold text-primary mb-4 border-b border-cafebrown-100 pb-2">Customization Options</h3>
            
            {item.customizations.map(group => (
              <div key={group.id}>
                <div className="flex justify-between items-end mb-3">
                  <h4 className="font-bold text-primary text-lg">{group.name}</h4>
                  <span className="text-xs text-cafebrown-400 font-medium uppercase">
                    {group.type === 'single' ? 'Choose 1' : 'Optional'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {group.options.map(option => {
                    const isSelected = (selections[group.id] || []).includes(option.id);
                    return (
                      <label 
                        key={option.id} 
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl border transition-colors cursor-pointer",
                          isSelected ? "border-accent bg-accent/5" : "border-cafebrown-200 bg-surface"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex items-center justify-center border",
                            group.type === 'single' ? "w-5 h-5 rounded-full" : "w-5 h-5 rounded-md",
                            isSelected ? "border-accent bg-accent" : "border-cafebrown-300"
                          )}>
                            {isSelected && (
                              group.type === 'single' 
                                ? <div className="bg-white w-2 h-2 rounded-full" /> 
                                : <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            )}
                          </div>
                          <span className={cn("font-medium", isSelected ? "text-primary" : "text-cafebrown-700")}>
                            {option.name}
                          </span>
                        </div>
                        {option.price > 0 && (
                          <span className="text-sm text-cafebrown-500 font-medium">+₹{option.price}</span>
                        )}
                        <input 
                          type={group.type === 'single' ? "radio" : "checkbox"}
                          className="hidden"
                          checked={isSelected}
                          onChange={() => handleOptionToggle(group.id, option.id, group.type === 'single')}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
