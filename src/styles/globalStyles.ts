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
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: gray;
    border-radius: 10px;
  }
  /* 火狐浏览器 */
  body {
    scrollbar-width: thin; /* auto | thin | none */
    scrollbar-color: gray white; /* 滚动条拇指颜色 轨道颜色 */
  }

  /* IE/Edge 浏览器（兼容性较差，一般不做特殊处理） */
  body {
    -ms-overflow-style: scrollbar; /* 恢复默认滚动条 */
    /* 或隐藏：-ms-overflow-style: none; */
  }
`;
