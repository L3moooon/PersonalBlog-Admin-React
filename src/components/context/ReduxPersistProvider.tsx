import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import React from 'react';

interface ReduxPersistProviderProps {
  children: React.ReactNode;
}

const ReduxPersistProvider: React.FC<ReduxPersistProviderProps> = ({
  children,
}) => {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </StoreProvider>
  );
};

export default ReduxPersistProvider;
