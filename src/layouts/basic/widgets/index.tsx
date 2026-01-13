import { Flex } from 'antd';
import Message from './Message';
import Settings from './Settings';
import ToggleTheme from './ToggleTheme';
import User from './user';

const Widgets = () => {
  return (
    <Flex justify="space-between" align="center" gap={16}>
      <Message />
      <Settings />
      <ToggleTheme />
      <User />
    </Flex>
  );
};
export default Widgets;
