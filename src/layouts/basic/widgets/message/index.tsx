import { Badge } from 'antd';
import Icon from '@/components/Icon';

const Message = () => {
  return (
    <Badge count={2} dot>
      <Icon name="main-message" size="1.3rem" />
    </Badge>
  );
};
export default Message;
