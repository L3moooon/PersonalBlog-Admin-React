import { type FC, type SVGProps } from 'react';

// 定义 Icon 组件的 Props
interface IconProps extends SVGProps<SVGSVGElement> {
  name: string; // 图标名称（对应 symbolId：如 icon-user-add、icon-nav-home）
  size?: number | string; // 图标大小（
  color?: string; // 图标颜色（默认继承父元素）
}

const Icon: FC<IconProps> = ({
  name,
  size = '1.5rem',
  color,
  className,
  // ...rest
}) => {
  const symbolId = `#icon-${name}`;
  const sizeStyle = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    color: color,
  };
  return (
    <svg className={className} style={sizeStyle} aria-hidden="true">
      <use xlinkHref={symbolId}></use>
    </svg>
  );
};
export default Icon;
