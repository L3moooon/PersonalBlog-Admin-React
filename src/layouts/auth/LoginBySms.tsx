import { createStyles } from 'antd-style';
import { Flex, Button, Form, Input, type FormProps } from 'antd';
import { usePageType } from './context/PageTypeContext';
import { useState, useEffect } from 'react';
import { login, getSmsCaptcha } from '@/api/auth';
import phoneImg from '@/assets/images/phone.png';

import { useDispatch } from 'react-redux'; // 导入 Hooks
import type { AppDispatch } from '@/store'; // 导入类型
import { setUserInfo } from '@/store/slices/userSlice';
import { messageApi } from '@/utils/globalInstance';
import CustomErrorHelp from './CustomErrorHelp';
import { useNavigate } from 'react-router-dom';

const useHeaderStyles = createStyles(() => ({
  header: {
    userSelect: 'none',
    width: '100%',
    padding: '0 1.5rem',
    position: 'relative',
  },
  title: {
    margin: '0',
    fontSize: '2.25rem',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '0.8rem',
    color: '#737373',
    marginTop: '0.5rem',
  },
  phoneImg: {
    position: 'absolute',
    right: '1.5rem',
    top: 0,
    width: '5rem',
  },
}));
const HeaderSection = () => {
  const { styles } = useHeaderStyles();
  return (
    <div className={styles.header}>
      <div className={styles.title}>欢迎回来</div>
      <div className={styles.text}>请输入您的手机号获取验证码登录</div>
      <img className={styles.phoneImg} src={phoneImg} alt="" />
    </div>
  );
};
type FieldType = {
  tel: string;
  verificationCode: string;
};
const useContentStyles = createStyles(() => ({
  content: {
    width: '100%',
    overflow: 'hidden',
    padding: '0.8rem',
  },
  formItem: {
    marginBottom: '1rem',
  },
  formItemNoMargin: {
    marginBottom: '0',
  },
  formItemLast: {
    marginBottom: '1.5rem',
  },
  input: {
    height: '2.25rem',
  },
  button: {
    width: '8rem',
    height: '2.25rem',
  },
}));
const ContentSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { styles } = useContentStyles();
  const { onUpdatePageType } = usePageType();
  const [loading, setLoading] = useState(false);
  const [waitTime, setWaitTime] = useState(0);
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  //获取验证码
  const handleGetVerificationCode = async () => {
    if (!phone) {
      messageApi.error('请输入手机号');
      return;
    }
    try {
      setLoading(true);
      await getSmsCaptcha({ tel: phone });
      messageApi.success('验证码已发送');
      setWaitTime(60);
    } catch (error) {
      messageApi.error('获取验证码失败,' + error);
    } finally {
      setLoading(false);
    }
  };

  // 倒计时逻辑
  const isCountingDown = waitTime > 0;
  useEffect(() => {
    if (isCountingDown) {
      const timer = setInterval(() => {
        setWaitTime(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCountingDown]);
  //提交成功
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    console.log('Success:', values);
    const { tel, verificationCode } = values;
    const { code, user, token } = await login({
      type: 'phone',
      tel,
      verificationCode,
    });
    switch (code) {
      case 1:
        dispatch(setUserInfo({ token, userInfo: user }));
        messageApi.success('登录成功');
        navigate('/');
        break;
      case 10008:
        messageApi.error('验证码已过期，请重新获取');
        break;
      case 10009:
        messageApi.error('验证码错误');
        break;
      default:
        messageApi.error('登录失败');
        break;
    }
  };
  //提交失败
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.content}>
      <Form
        className={styles.content}
        name="basic"
        layout="vertical"
        requiredMark={false}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="手机号"
          name="tel"
          className={styles.formItem}
          rules={[
            {
              required: true,
              message: <CustomErrorHelp errors="手机号不能为空" />,
            },
            {
              type: 'string',
              pattern: /^1[3-9]\d{9}$/, // 使用正则表达式
              message: <CustomErrorHelp errors="请输入有效的手机号格式" />,
            },
          ]}
        >
          <Input
            className={styles.input}
            placeholder="请输入手机号..."
            onChange={e => setPhone(e.target.value)}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="验证码"
          name="verificationCode"
          className={styles.formItemLast}
          rules={[
            {
              required: true,
              message: <CustomErrorHelp errors="验证码不能为空" />,
            },
          ]}
        >
          <Flex justify="space-between" align="center">
            <Input.OTP length={4} className={styles.input} />
            <Button
              className={styles.button}
              loading={loading}
              disabled={loading || !phone || waitTime > 0}
              onClick={handleGetVerificationCode}
            >
              {loading
                ? '获取中...'
                : waitTime > 0
                  ? `${waitTime}秒后重试`
                  : '获取验证码'}
            </Button>
          </Flex>
        </Form.Item>

        <Form.Item className={styles.formItem}>
          <Button
            type="primary"
            className={styles.button}
            block={true}
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
        <Form.Item className={styles.formItemNoMargin}>
          <Button
            className={styles.button}
            block={true}
            onClick={() => onUpdatePageType('account')}
          >
            返回
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const LoginBySms = () => {
  return (
    <>
      <HeaderSection />
      <ContentSection />
    </>
  );
};

export default LoginBySms;
