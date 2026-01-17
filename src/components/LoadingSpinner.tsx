import { Spin } from 'antd';
import Icon from '@/components/Icon';
import { createStyles } from 'antd-style';
import { theme } from 'antd';

const { useToken } = theme;
import { iconRotate } from '@/styles/animation';
const useStyles = createStyles(({ token }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: token.colorPrimary,

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  icon: {
    animation: `${iconRotate} 1s linear infinite`,
  },
}));

const LoadingSpinner = () => {
  const { styles } = useStyles();
  const { token } = useToken();
  return (
    <div className={styles.container}>
      <Spin
        size="large"
        styles={{
          mask: {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
          },
          tip: { color: token.colorPrimary },
        }}
        indicator={<Icon name="main-spinner" className={styles.icon} />}
      />
    </div>
  );
};

export default LoadingSpinner;
