import { createContext, useContext } from 'react';
import type { PageTypeContextType } from '../types';

export const PageTypeContext = createContext<PageTypeContextType | undefined>(
  undefined
);

export const usePageType = () => {
  const context = useContext(PageTypeContext);
  if (!context) {
    throw new Error('usePageType must be used within a PageTypeProvider');
  }
  return context;
};
