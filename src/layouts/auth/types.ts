export type PageType =
  | 'account'
  | 'mail'
  | 'phone'
  | 'forget'
  | 'reset'
  | 'register';

export interface PageTypeContextType {
  onUpdatePageType: (pageType: PageType) => void;
}
