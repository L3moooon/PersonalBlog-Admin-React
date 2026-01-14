import { keyframes } from 'antd-style';

//移入移出(上下)
export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 0.9;
    transform: translateY(0);
  }
`;

export const fadeOutDown = keyframes`
  from {
    opacity: 0.9;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

//图标hover动画-缩放
export const iconScale = keyframes`
  0% {
    transform: scale(1);
  }
  50%{
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;
//图标动画-旋转
export const iconRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
