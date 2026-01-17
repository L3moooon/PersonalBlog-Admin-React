import { Modal, Button, Flex, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { useState, useEffect } from 'react';
import { createStyles } from 'antd-style';
import { useNavigate } from 'react-router-dom';
import {
  saveAccount,
  setLockScreen,
  setLockScreenPassword,
} from '@/store/slices/userSlice';
import { formatDate } from '@/utils/timeFormatter';
import { messageApi } from '@/utils/globalInstance';

const useStyles = createStyles(() => ({
  lockScreenContainer: {
    width: '100%',
    height: '100%',
    marginBottom: '2rem',
  },
  lockScreenTitle: {
    width: '100%',
    height: '7rem',
    color: '#F2F2F2',
    fontSize: '4rem',
    textAlign: 'center',
  },
  timeCard: {
    width: '8rem',
    height: '10rem',
    backgroundColor: '#2E3033',
    color: '#F2F2F2',
    borderRadius: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '4rem',
  },
  input: {
    marginBottom: '1rem',
  },
  button: {
    width: '12.5rem',
    '&:disabled': {
      backgroundColor: '#2E3033',
      color: '#F2F2F2',
    },
  },
}));
const LockScreen = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { styles } = useStyles();

  const [password, setPassword] = useState('');
  const [time, setTime] = useState(formatDate(new Date()));
  const { lockScreen, lockScreenPassword } = useSelector(
    (state: RootState) => state.user
  );
  const handleLock = () => {
    if (password == lockScreenPassword) {
      dispatch(setLockScreen(false));
      dispatch(setLockScreenPassword(''));
      setPassword('');
      messageApi.success('解锁成功');
    } else {
      messageApi.error('密码错误');
    }
  };
  //跳过锁屏密码重新登录需要清除保存的账号密码
  const handleReLogin = () => {
    navigator('/auth');
    dispatch(saveAccount({ account: '', password: '' })); //清除保存的账号密码
    dispatch(setLockScreen(false)); //关闭锁屏
    dispatch(setLockScreenPassword('')); //清除锁屏密码
  };
  // 定时器：每秒更新一次时间
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatDate(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Modal
      open={lockScreen}
      closable={false}
      centered={true}
      destroyOnHidden={true}
      width="100vw"
      style={{
        maxWidth: '100vw',
      }}
      styles={{
        wrapper: {
          overflow: 'hidden',
        },
        container: {
          height: '100vh',
          borderRadius: 0,
          background: '#1C1E23',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      footer={null}
      title={null}
    >
      <div className={styles.lockScreenContainer}>
        <div className={styles.lockScreenTitle}>锁定中</div>
        <Flex justify="space-between" gap={20}>
          <div className={styles.timeCard}>{time.hours}</div>
          <div className={styles.timeCard}>{time.minutes}</div>
          <div className={styles.timeCard}>{time.seconds}</div>
        </Flex>
      </div>
      <Input.Password
        placeholder="请输入锁屏密码"
        className={styles.input}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Flex justify="space-between">
        <Button className={styles.button} onClick={handleReLogin}>
          重新登录
        </Button>
        <Button
          type="primary"
          className={styles.button}
          onClick={handleLock}
          disabled={password.length == 0}
        >
          解锁
        </Button>
      </Flex>
    </Modal>
  );
};
export default LockScreen;
