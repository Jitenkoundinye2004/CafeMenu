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
  rating: number;
  prepTime: string;
  isVeg: boolean;
  isBestseller?: boolean;
  imageUrl: string;
  ingredients?: string[];
  customizations?: CustomizationGroup[];
};

export type MenuCategory = {
  id: string;
  name: string;
  description: string;
  icon?: string;
};

interface MenuContextType {
  categories: MenuCategory[];
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, itemsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/categories`),
          fetch(`${API_BASE_URL}/api/menu`)
        ]);
        
        if (!catsRes.ok || !itemsRes.ok) throw new Error('Failed to fetch data');
        
        const cats = await catsRes.json();
        const items = await itemsRes.json();
        
        setCategories(cats);
        setMenuItems(items);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MenuContext.Provider value={{ categories, menuItems, loading, error }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within MenuProvider');
  return context;
};
