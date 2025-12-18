import React, { createContext, useContext, type ReactNode } from 'react';

type PageType = 'account' | 'mail' | 'phone' | 'forget' | 'reset' | 'register';
interface PageTypeContextType {
  onUpdatePageType: (pageType: PageType) => void;
}

const PageTypeContext = createContext<PageTypeContextType | undefined>(
  undefined
);
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

export const usePageType = () => {
  const context = useContext(PageTypeContext);
  if (!context) {
    throw new Error('usePageType must be used within a PageTypeProvider');
  }
  return context;
};
