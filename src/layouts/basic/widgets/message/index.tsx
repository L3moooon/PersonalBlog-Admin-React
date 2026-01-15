import { Badge } from 'antd';
import Icon from '@/components/Icon';
import { createStyles } from 'antd-style';
import { iconShake } from '@/styles/animation';

const useStyles = createStyles(() => ({
  icon: {
    '&:hover': {
      animation: `${iconShake} 0.7s ease`,
    },
  },
}));
const Message = () => {
  const { styles } = useStyles();
  return (
    <Badge count={2} dot>
      <Icon name="main-message" size="1.3rem" className={styles.icon} />
    </Badge>
  );
};
export default Message;
