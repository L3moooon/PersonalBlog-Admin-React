import { Flex } from 'antd';
import { createStyles } from 'antd-style';

import Message from './message';
import FullScreen from './FullScreen';
import Settings from './setting';
import ToggleTheme from './ToggleTheme';
import User from './user';

import { iconScale } from '@/styles/animation';

const useStyle = createStyles(({ token }) => ({
  widgetItem: {
    width: '2rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '50%',
    '&:hover': {
      // backgroundColor: token.colorFillTertiary,
      backgroundColor: token.colorBgContainerDisabled,
      animation: `${iconScale} 0.5s ease`,
    },
    '&:nth-last-child(2)': {
      animation: 'none',
    },
    '&:last-child': {
      width: '2.7rem',
      height: '2.7rem',
      animation: 'none',
    },
  },
}));
const Widgets = () => {
  const { styles } = useStyle();
  const component = [
    <Settings />,
    <ToggleTheme />,
    <FullScreen />,
    <Message />,
    <User />,
  ];
  return (
    <Flex justify="space-between" align="center" gap={5}>
      {component.map((item, index) => (
        <div className={styles.widgetItem} key={index}>
          {item}
        </div>
      ))}
    </Flex>
  );
};
export default Widgets;
