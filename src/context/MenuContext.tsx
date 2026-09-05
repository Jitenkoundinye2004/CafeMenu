import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { API_BASE_URL } from '../config/api';

export type CustomizationOption = {
  id: string;
  name: string;
  price: number;
};

export type CustomizationGroup = {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  options: CustomizationOption[];
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVeg: boolean;
  rating: number;
  prepTime?: string;
  calories?: number;
  ingredients?: string[];
  isBestseller?: boolean;
  customizations?: CustomizationGroup[];
};

export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
};

interface MenuContextType {
  categories: MenuCategory[];
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  refreshMenu: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const CACHE_KEY_CATEGORIES = 'cached_cafe_categories';
const CACHE_KEY_MENU = 'cached_cafe_menu';

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state directly from localStorage cache for instant (0ms) render
  const [categories, setCategories] = useState<MenuCategory[]>(() => {
    try {
      const saved = localStorage.getItem(CACHE_KEY_CATEGORIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(CACHE_KEY_MENU);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // If we already have cached data, don't block the UI with a full-screen loading state
  const [loading, setLoading] = useState<boolean>(() => {
    try {
      const hasCats = !!localStorage.getItem(CACHE_KEY_CATEGORIES);
      const hasItems = !!localStorage.getItem(CACHE_KEY_MENU);
      return !(hasCats && hasItems);
    } catch {
      return true;
    }
  });

  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [catsRes, itemsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/categories`),
        fetch(`${API_BASE_URL}/api/menu`)
      ]);
      
      if (!catsRes.ok || !itemsRes.ok) throw new Error('Failed to fetch data');
      
      const cats = await catsRes.json();
      const items = await itemsRes.json();
      
      if (Array.isArray(cats) && cats.length > 0) {
        setCategories(cats);
        localStorage.setItem(CACHE_KEY_CATEGORIES, JSON.stringify(cats));
      }
      if (Array.isArray(items) && items.length > 0) {
        setMenuItems(items);
        localStorage.setItem(CACHE_KEY_MENU, JSON.stringify(items));
      }
      setError(null);
    } catch (err: any) {
      console.warn('Background menu refresh error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MenuContext.Provider value={{ categories, menuItems, loading, error, refreshMenu: fetchData }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within MenuProvider');
  return context;
};
