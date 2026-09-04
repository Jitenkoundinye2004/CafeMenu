import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import { ProductCard } from '../components/ProductCard';
import { Search as SearchIcon, X, ArrowLeft } from 'lucide-react';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { menuItems, loading } = useMenu();

  const popularSearches = ['Coffee', 'Pizza', 'Burger', 'Pasta', 'Brownie'];

  const results = query.trim() === '' 
    ? [] 
    : menuItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.categoryId.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-surface pb-32">
      <div className="sticky top-0 z-40 bg-background pt-4 pb-2 px-4 border-b border-cafebrown-200">
        <div className="flex gap-3 mb-4 items-center w-full">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full text-primary hover:bg-cafebrown-100">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-serif text-2xl font-bold text-primary">What are you craving?</h1>
        </div>

        <div className="relative w-full">
          <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-cafebrown-400" />
          <input 
            type="text"
            placeholder="Search coffee, pizza, dessert..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-cafebrown-50 border border-cafebrown-200 rounded-full py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cafebrown-400 hover:text-primary p-1"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 w-full">
        {loading ? (
          <div className="text-center py-12 text-cafebrown-500">Loading...</div>
        ) : query === '' ? (
          <div>
            <h3 className="text-sm font-bold text-cafebrown-400 uppercase tracking-wider mb-4">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map(term => (
                <button 
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-cafebrown-50 border border-cafebrown-100 rounded-full text-sm font-medium text-cafebrown-700 active:scale-95 transition-transform"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {results.length > 0 ? (
              results.map(item => <ProductCard key={item.id} item={item} />)
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-cafebrown-50 rounded-full flex items-center justify-center mx-auto mb-4 text-cafebrown-300">
                  <SearchIcon size={32} />
                </div>
                <h3 className="font-serif font-bold text-lg text-primary mb-2">Nothing matched your search</h3>
                <p className="text-sm text-cafebrown-500 mb-6">Try searching for coffee, pizza or dessert.</p>
                <button 
                  onClick={() => navigate('/menu')}
                  className="text-accent font-medium text-sm underline"
                >
                  Browse all items
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
