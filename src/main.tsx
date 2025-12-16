import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router';
import { GlobalStyles } from './styles/globalStyles';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <GlobalStyles />
    <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
