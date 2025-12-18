import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { GlobalStyles } from './styles/globalStyles';
import 'virtual:svg-icons-register';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyles />
        <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
