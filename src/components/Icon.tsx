import { type FC, type SVGProps } from 'react';
import { cx, createStyles } from 'antd-style';
// 定义 Icon 组件的 Props
interface IconProps extends SVGProps<SVGSVGElement> {
  name: string; // 图标名称（对应 symbolId：如 icon-user-add、icon-nav-home）
  size?: number | string; // 图标大小（
}
const useStyles = createStyles(() => ({
  icon: {
    fill: 'currentColor',
    cursor: 'pointer',
  },
}));
const Icon: FC<IconProps> = ({
  name,
  size = '1rem',
  className,
  style,
  ...rest
}) => {
  const { styles } = useStyles();
  const symbolId = `#icon-${name}`;
  const sizeStyle = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  };
  return (
    <svg
      className={cx(styles.icon, className)}
      aria-hidden="true"
      style={{ ...sizeStyle, ...style }}
      {...rest}
    >
      <use xlinkHref={symbolId}></use>
    </svg>
  );
};
export default Icon;
