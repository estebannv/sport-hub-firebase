import { CommonService, IParameter } from '@/services/common.service';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface CategoriesContextType {
  categories: IParameter[];
  loading: boolean;
  refreshCategories: () => Promise<void>;
}

export const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

interface CategoriesProviderProps {
  children: ReactNode;
}

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<IParameter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const result = await CommonService.Parameters('categories');
      setCategories(result?.Data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshCategories = async () => {
    await loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, refreshCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
