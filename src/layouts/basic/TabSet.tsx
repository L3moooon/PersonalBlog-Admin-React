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
import { useState, useEffect, useRef } from 'react';

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
    // transition: 'all 0.3s ease',
    position: 'relative',
    color: token.colorTextBase,
    border: `1px solid ${token.colorBorderSecondary}`,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: 0,
      width: 0,
      height: '1px',
      backgroundColor: token.colorPrimary,
      transition: 'width 0.3s ease',
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

  const [visible, setVisible] = useState(false);
  const [selectPath, setSelectPath] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const contextMenuItemRef = useRef<HTMLDivElement>(null);
  const contextMenu = [
    {
      label: '关闭',
      icon: 'public-close',
      onClick: () => dispatch(removeTab(selectPath)),
    },
    {
      label: '固定',
      icon: 'main-pin',
      onClick: () => dispatch(togglePinTab(selectPath)),
    },
    {
      label: '最大化',
      icon: 'main-fullscreen',
      onClick: () => toggleFullscreen(),
    },
    {
      label: '重新加载',
      icon: 'main-reload',
      onClick: () => handleReload(),
    },
    {
      label: '在新窗口打开',
      icon: 'main-open',
      onClick: () => handleOpenNewWindow(),
    },
    {
      label: '关闭左侧标签页',
      icon: 'main-close-left',
      onClick: () => dispatch(closeLeftTabs(selectPath)),
    },
    {
      label: '关闭右侧标签页',
      icon: 'main-close-right',
      onClick: () => dispatch(closeRightTabs(selectPath)),
    },
    {
      label: '关闭其他标签页',
      icon: 'main-close-other',
      onClick: () => dispatch(closeOtherTabs(selectPath)),
    },

    {
      label: '关闭全部标签页',
      icon: 'main-close-all',
      onClick: () => dispatch(closeAllTabs()),
    },
  ];
  const handleContextMenu = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(true);
    setSelectPath(path);
    setPosition({ x: e.clientX, y: e.clientY });
  };
  const toggleFullscreen = () => {
    // const element = document.documentElement;
    // if (!document.fullscreenElement) {
    //   element.requestFullscreen();
    // } else {
    //   document.exitFullscreen();
    // }
  };
  const handleReload = () => {
    window.location.reload();
  };
  const handleOpenNewWindow = () => {
    window.open(window.location.origin + selectPath, '_blank');
  };

  useEffect(() => {
    const handleClickOutSide = () => setVisible(false);
    const handleContextOutSide = (e: MouseEvent) => {
      if (!contextMenuItemRef.current) return;
      if (!contextMenuItemRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutSide);
    document.addEventListener('contextmenu', handleContextOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
      document.removeEventListener('contextmenu', handleContextOutSide);
    };
  }, []);

  useEffect(() => {
    if (!tabs.some((tab: TabItem) => tab.path === activeKey)) {
      const lastTab = tabs[tabs.length - 1];
      if (lastTab) {
        dispatch(changeTab(lastTab.path));
      } else {
        dispatch(changeTab('/'));
      }
    }
  }, [tabs]);

  return (
    <div className={styles.container}>
      {tabs.map((tab: TabItem) => (
        <div
          className={cx(
            styles.tabItem,
            activeKey === tab.path && styles.activeTabItem
          )}
          key={tab.path}
          onClick={() => dispatch(changeTab(tab.path))}
          onContextMenu={e => handleContextMenu(e, tab.path)}
        >
          <Icon name={tab.icon} />
          <div>{tab.title}</div>
          {fixedTabs.includes(tab.path) && (
            <Icon
              name="main-pin"
              onClick={e => {
                e.stopPropagation();
                dispatch(togglePinTab(tab.path));
              }}
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
          ref={contextMenuItemRef}
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
          {contextMenu.map((item, index) => (
            <div
              className={styles.contextMenuItem}
              onClick={() => item.onClick()}
              key={index}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default TabSet;
