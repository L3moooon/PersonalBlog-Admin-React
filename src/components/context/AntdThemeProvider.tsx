import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'antd-style';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { getAntdTheme } from '@/styles/antdTheme';
import React from 'react';
import zhCN from 'antd/locale/zh_CN';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';

// // 设置 dayjs 为中文
// dayjs.locale('zh-cn');

interface AntdThemeProviderProps {
  children: React.ReactNode;
}

const AntdThemeProvider: React.FC<AntdThemeProviderProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.setting.theme);

  return (
    <ThemeProvider
      appearance={theme === 'system' ? 'auto' : theme}
      theme={getAntdTheme}
    >
      <ConfigProvider
        locale={zhCN}
        theme={{
          // 这里可以根据需要进一步自定义 antd 的 token
          token: {
            colorPrimary: '#1677ff',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default AntdThemeProvider;
