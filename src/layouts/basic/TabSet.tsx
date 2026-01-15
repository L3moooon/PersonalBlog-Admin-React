import { createStyles, cx } from 'antd-style';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import {
  changeTab,
  removeTab,
  togglePinTab,
  closeLeftTabs,
  closeRightTabs,
  closeOtherTabs,
  closeAllTabs,
  type TabItem,
} from '@/store/slices/userSlice';
import Icon from '@/components/Icon';
import { Card } from 'antd';
import { useState, useEffect } from 'react';

const useStyles = createStyles(({ token }) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '2.5rem',
    backgroundColor: token.colorBgContainer,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  },
  tabItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    width: 'fit-content',
    padding: '0 1rem',
    height: '100%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    border: `1px solid ${token.colorBorderSecondary}`,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: 0,
      width: 0,
      height: '1px',
      backgroundColor: token.colorPrimary,
      transition: 'width 0.2s ease',
    },
    '&:hover': {
      backgroundColor: token.controlItemBgHover,
      '&::after': {
        width: '100%',
      },
    },
  },
  activeTabItem: {
    backgroundColor: token.controlItemBgActive,
    color: token.colorPrimary,
    '&::after': {
      width: '100%',
    },
    '&:hover': {
      backgroundColor: token.controlItemBgActive,
    },
  },
  card: {},
  contextMenuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    transition: 'all 0.2s ease',
    borderRadius: '0.25rem',
    height: '1.75rem',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
}));

const TabSet = () => {
  const { styles } = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { tabs, activeKey, fixedTabs } = useSelector(
    (state: RootState) => state.user
  );
  // console.log(tabs, activeKey, fixedTabs);
  const [visible, setVisible] = useState(false);
  const [selectPath, setSelectPath] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent, path: string) => {
    console.log(e, path);

    e.preventDefault();
    setVisible(true);
    setSelectPath(path);
    setPosition({ x: e.clientX, y: e.clientY });
  };
  const toggleFullscreen = () => {};
  const handleReload = () => {};
  const handleOpenNewWindow = () => {};
  // useEffect(() => {
  //   const clickOutside = (e: MouseEvent) => {
  //     console.log(e);
  //     if (!e.composedPath().includes(document.getElementById('tab-set')!)) {
  //       setVisible(false);
  //     }
  //   };
  //   // window.addEventListener('contextmenu', () => setVisible(false));
  //   window.addEventListener('click', clickOutside);
  //   return () => {
  //     window.removeEventListener('click', clickOutside);
  //     // window.removeEventListener('contextmenu', () => setVisible(false));
  //   };
  // }, [tabs]);
  return (
    <div className={styles.container}>
      {tabs.map(tab => (
        <div
          className={cx(
            styles.tabItem,
            activeKey === tab.path && styles.activeTabItem
          )}
          key={tab.path}
          onClick={() => dispatch(changeTab(tab.path))}
          onContextMenu={e => handleContextMenu(e, tab.path)}
        >
          {tab.title}
          {fixedTabs.includes(tab.path) && (
            <Icon
              name="main-pin"
              onClick={() => dispatch(togglePinTab(tab.path))}
            />
          )}
          {!fixedTabs.includes(tab.path) && tabs.length > 1 && (
            <Icon
              name="public-close"
              onClick={() => dispatch(removeTab(tab.path))}
            />
          )}
        </div>
      ))}
      {visible && (
        <Card
          id="tab-set"
          size="small"
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            zIndex: 99,
            width: '10rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          styles={{ body: { padding: '0.5rem' } }}
        >
          <div
            className={styles.contextMenuItem}
            onClick={() => dispatch(removeTab(selectPath))}
          >
            <Icon name="public-close" />
            <span>关闭</span>
          </div>
          <div
            className={styles.contextMenuItem}
            onClick={() => dispatch(togglePinTab(selectPath))}
          >
            <Icon name="main-pin" />
            <span>固定</span>
          </div>
          <div className={styles.contextMenuItem} onClick={toggleFullscreen}>
            <Icon name="main-fullscreen" />
            <span>最大化</span>
          </div>
          <div className={styles.contextMenuItem} onClick={handleReload}>
            <Icon name="main-reload" />
            <span>重新加载</span>
          </div>
          <div className={styles.contextMenuItem} onClick={handleOpenNewWindow}>
            <Icon name="main-open" />
            <span>在新窗口打开</span>
          </div>
          <div
            className={styles.contextMenuItem}
            onClick={() => dispatch(closeLeftTabs(selectPath))}
          >
            <Icon name="main-close-left" />
            <span>关闭左侧标签页</span>
          </div>
          <div
            className={styles.contextMenuItem}
            onClick={() => dispatch(closeRightTabs(selectPath))}
          >
            <Icon name="main-close-right" />
            <span>关闭右侧标签页</span>
          </div>
          <div
            className={styles.contextMenuItem}
            onClick={() => dispatch(closeOtherTabs(selectPath))}
          >
            <Icon name="main-close-other" />
            <span>关闭其他标签页</span>
          </div>
          <div
            className={styles.contextMenuItem}
            onClick={() => dispatch(closeAllTabs(selectPath))}
          >
            <Icon name="main-close-all" />
            <span>关闭全部标签页</span>
          </div>
        </Card>
      )}
    </div>
  );
};
export default TabSet;
