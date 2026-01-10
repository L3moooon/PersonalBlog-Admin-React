import { resetPassword } from '@/api/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Flex, Result, Button, Typography, Card } from 'antd';
import { createStyles } from 'antd-style';
import { fadeOutDown, fadeUp } from '@/styles/animation';
import backgroundImg from '@/assets/images/background.png';

const { Text, Paragraph } = Typography;

const useStyles = createStyles(() => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  card: {
    width: '90%',
    maxWidth: '500px',
    borderRadius: '1rem',
    opacity: 0.9,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    animation: `${fadeUp} 0.2s ease-in forwards`,
  },
  content: {
    padding: '24px',
  },
  exiting: {
    animation: `${fadeOutDown} 0.2s ease-out forwards`,
  },
  passwordBox: {
    background: 'rgba(0, 0, 0, 0.03)',
    padding: '1.5rem',
    borderRadius: '1rem',
    marginTop: '1.5rem',
    border: '1px dashed #d9d9d9',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  passwordLabel: {
    marginBottom: '0.8rem',
    display: 'block',
  },
  passwordValue: {
    fontSize: '2rem',
    letterSpacing: '0.15rem',
  },
  mention: {
    textAlign: 'left',
    background: 'rgba(0,0,0,0.03)',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    marginTop: '0.5rem',
  },
  btn: {
    height: '2.5rem',
    borderRadius: '0.5rem',
    marginTop: '1rem',
  },
}));

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { styles, cx } = useStyles();

  // 状态流转：ready (等待指令/校验) -> success (执行成功) -> error (执行失败)
  const [step, setStep] = useState<'ready' | 'success' | 'error'>('ready');
  const [isExiting, setIsExiting] = useState(false);

  const payload = JSON.parse(atob(token!.split('.')[1])); // 解析 token 的 payload
  const account = payload.account;

  const updateStep = (nextStep: 'ready' | 'success' | 'error') => {
    setIsExiting(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsExiting(false);
    }, 200);
  };
  const navigateToLogin = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/auth');
    }, 200);
  };

  // 执行重置密码逻辑
  const handleConfirmReset = async () => {
    if (!token) {
      updateStep('error');
      return;
    }
    setLoading(true);
    try {
      const { data, code } = await resetPassword({ token });
      if (code === 1) {
        setPassword(data.password);
        updateStep('success');
      } else {
        updateStep('error');
      }
    } catch {
      updateStep('error');
    }
    setLoading(false);
  };

  return (
    <Flex justify="center" align="center" className={styles.root}>
      <Card
        className={cx(styles.card, isExiting && styles.exiting)}
        bordered={false}
        key={step}
      >
        <div className={styles.content}>
          {/* 第一阶段：确认确认（防止刷新自动调用的核心） */}
          {step === 'ready' && (
            <Result
              status="info"
              title="重置确认"
              subTitle={
                <div className={styles.mention}>
                  <Paragraph>
                    您正在为账号 <Text strong>{account || '未知账号'}</Text>{' '}
                    重置密码
                  </Paragraph>
                  <Paragraph style={{ marginBottom: 0 }}>
                    <Text type="secondary">
                      点击下方按钮将生成一个新的随机临时密码，同时原密码将立即失效
                    </Text>
                  </Paragraph>
                </div>
              }
              extra={[
                <Button
                  type="primary"
                  key="confirm"
                  loading={loading}
                  className={styles.btn}
                  block
                  onClick={handleConfirmReset}
                  disabled={!account}
                >
                  确认重置密码
                </Button>,
                <Button
                  type="link"
                  key="cancel"
                  onClick={navigateToLogin}
                  style={{ marginTop: '0.5rem' }}
                >
                  取消并返回登录
                </Button>,
              ]}
            />
          )}

          {/* 第二阶段：成功 */}
          {step === 'success' && (
            <Result
              status="success"
              title="新密码已生成"
              subTitle="请复制并保存下方的临时密码，登录后请尽快在个人中心进行修改"
              extra={[
                <Button
                  type="primary"
                  key="login"
                  className={styles.btn}
                  block
                  onClick={() => navigate('/auth')}
                >
                  立即登录
                </Button>,
              ]}
            >
              <div className={styles.passwordBox}>
                <span className={styles.passwordLabel}>您的临时密码</span>
                <Text
                  copyable={{ text: password }}
                  className={styles.passwordValue}
                >
                  {password}
                </Text>
              </div>
            </Result>
          )}

          {/* 第三阶段：失败 */}
          {step === 'error' && (
            <Result
              status="error"
              title="无法重置密码"
              subTitle={
                !account
                  ? '链接参数不完整，请确保从邮件中点击了正确的重置链接。'
                  : '链接已失效或账号不存在。'
              }
              extra={[
                <Button
                  type="primary"
                  key="back"
                  className={styles.btn}
                  block
                  onClick={() => updateStep('ready')}
                >
                  返回重试
                </Button>,
              ]}
            />
          )}
        </div>
      </Card>
    </Flex>
  );
};

export default ResetPassword;
