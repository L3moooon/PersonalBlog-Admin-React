import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { GlobalStyles } from './styles/globalStyles';
import AntdThemeProvider from './components/context/AntdThemeProvider.tsx';
import ReduxPersistProvider from './components/context/ReduxPersistProvider.tsx';
import 'virtual:svg-icons-register';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ReduxPersistProvider>
      <AntdThemeProvider>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntdThemeProvider>
    </ReduxPersistProvider>
  </StrictMode>
);
