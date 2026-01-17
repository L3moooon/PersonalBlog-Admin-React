import { createGlobalStyle } from 'antd-style';
import 'normalize.css';

// 使用 createGlobalStyle 定义全局类名（推荐，专门用于全局样式）
export const GlobalStyles = createGlobalStyle`
//全局怪异盒模型
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  //滚动条外观设置
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    width: 10px;
    background: #d9d9d9;
    border-radius: 10px;
  }
`;
