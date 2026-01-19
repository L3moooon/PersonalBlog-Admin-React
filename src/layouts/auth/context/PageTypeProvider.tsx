import React, { type ReactNode } from 'react';
import { PageTypeContext } from './PageTypeContext';
import type { PageType } from '../types';

export const PageTypeProvider: React.FC<{
  children: ReactNode;
  onUpdatePageType: (pageType: PageType) => void;
}> = ({ children, onUpdatePageType }) => {
  return (
    <PageTypeContext.Provider value={{ onUpdatePageType }}>
      {children}
    </PageTypeContext.Provider>
  );
};
