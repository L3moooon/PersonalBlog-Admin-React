import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import {
  logout,
  setLockScreen,
  setLockScreenPassword,
} from '@/store/slices/userSlice';

import {
  Flex,
  Avatar,
  Badge,
  Popover,
  Tag,
  Divider,
  Modal,
  Input,
  Button,
} from 'antd';
import { createStyles } from 'antd-style';

import LockScreen from './LockScreen';
import Icon from '@/components/Icon';
import { messageApi } from '@/utils/globalInstance';
import type { LoginResponse } from '@/api/auth/type';

const MyAvatar = ({
  avatar,
  size = 'default',
}: {
  avatar: string | null;
  size?: 'small' | 'default' | 'large' | number;
}) => {
  return (
    <>
      {!avatar && (
        <Avatar size={size} icon={<Icon name="main-user" size="70%" />} />
      )}
      {avatar && <Avatar size={size} src={avatar} />}
    </>
  );
};
type TitleProps = {
  userInfo: LoginResponse['user'];
};

const Title = ({ userInfo }: TitleProps) => {
  const { name, role_name, avatar } = userInfo;
  console.log(avatar);

  return (
    <Flex align="center" gap={16}>
      <MyAvatar avatar={avatar} size="large" />
      <div>
        <div>
          <span>{name}</span>
          <Tag color="green">{role_name}</Tag>
        </div>
        <div>{userInfo.account}</div>
      </div>
    </Flex>
  );
};

const useStyles = createStyles(() => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    height: '2rem',
    borderRadius: '0.5rem',
    padding: '0 0.5rem',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
  func: {
    width: '3rem',
    textAlign: 'center',
    marginLeft: 'auto',
  },
}));

type ContentProps = {
  handleLockScreen: () => void;
  handleLogout: () => void;
};
const Content = ({ handleLockScreen, handleLogout }: ContentProps) => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  return (
    <>
      <Divider size="small" />
      <div className={styles.item} onClick={() => navigate('/user-center')}>
        <Icon name="main-usercenter" size="1.2rem" />
        <span>个人中心</span>
      </div>
      <div className={styles.item} onClick={handleLockScreen}>
        <Icon name="main-lock" size="1.2rem" />
        <span>锁定屏幕</span>
        <div className={styles.func}>ALT L</div>
      </div>
      <div className={styles.item} onClick={handleLogout}>
        <Icon name="main-logout" size="1.2rem" />
        <span>退出登录</span>
        <div className={styles.func}>ALT Q</div>
      </div>
    </>
  );
};
const User = () => {
  const { userInfo, lockScreen } = useSelector(
    (state: RootState) => state.user
  );
  const { avatar, name } = userInfo;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
    messageApi.success('已退出登录');
  };
  const handleLockScreen = () => {
    setIsModalVisible(true);
  };
  const handleLockScreenSubmit = () => {
    dispatch(setLockScreen(true));
    dispatch(setLockScreenPassword(password));
    setIsModalVisible(false);
    setPassword(''); //清空表单
    messageApi.success('已锁定屏幕');
  };
  useEffect(() => {
    //退出登录快捷键
    function shortCut1(e: KeyboardEvent) {
      if (e.key === 'q' && e.altKey) {
        handleLogout();
      }
    }
    //锁定屏幕快捷键
    function shortCut2(e: KeyboardEvent) {
      if (e.key === 'l' && e.altKey) {
        handleLockScreen(); // 直接触发锁屏，无需经过弹窗
      }
    }
    document.addEventListener('keydown', shortCut1);
    document.addEventListener('keydown', shortCut2);
    return () => {
      document.removeEventListener('keydown', shortCut1);
      document.removeEventListener('keydown', shortCut2);
    };
  }, [dispatch, navigate]); // ✅ 加依赖项，避免闭包陷阱
  return (
    <>
      <Popover
        styles={{
          container: {
            padding: '0.5rem 0',
          },
          title: {
            padding: '0 0.5rem',
          },
          content: {
            padding: '0 0.2rem',
          },
        }}
        content={
          <Content
            handleLockScreen={handleLockScreen}
            handleLogout={handleLogout}
          />
        }
        title={<Title userInfo={userInfo} />}
        trigger="hover"
        arrow={false}
        placement="bottom"
      >
        <Badge dot status="success" offset={[-5, 45]}>
          <MyAvatar avatar={avatar} />
        </Badge>
      </Popover>

      <Modal
        title="锁定屏幕"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        styles={{
          body: {
            padding: '2rem',
          },
        }}
        footer={null}
      >
        <Flex vertical justify="center" align="center" gap={20}>
          <MyAvatar avatar={avatar} size={100} />
          <div>{name}</div>
          <Input.Password
            placeholder="请输入锁屏密码"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            block={true}
            disabled={password == ''}
            onClick={handleLockScreenSubmit}
          >
            锁定
          </Button>
        </Flex>
      </Modal>
      {lockScreen && <LockScreen />}
    </>
  );
};
export default User;
