import { CommonService, IParameter } from '@/services/common.service';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface CategoriesContextType {
  categories: IParameter[];
  loadingCategories: boolean;
  refreshCategories: () => Promise<void>;
}

export const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

interface CategoriesProviderProps {
  children: ReactNode;
}

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<IParameter[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const result = await CommonService.Parameters('categories');
      setCategories(result?.Data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const refreshCategories = async () => {
    await loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loadingCategories, refreshCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
