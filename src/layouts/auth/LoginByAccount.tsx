import { Flex, Button, Checkbox, Form, Input, type FormProps } from 'antd';
import { createStyles } from 'antd-style';
import { usePageType } from './context/PageTypeContext';
import { useState } from 'react';
import { login } from '@/api/auth';
import SlideCaptcha from '@/components/SlideCaptcha';
import welcomeImg from '@/assets/images/welcome-en.png';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { setUserInfo } from '@/store/slices/userSlice';
import { getItem, setItem } from '@/utils/getItem';
import { messageApi } from '@/utils/globalInstance';
import CustomErrorHelp from './CustomErrorHelp';

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
  welcomeImg: {
    position: 'absolute',
    right: '1.5rem',
    top: 0,
    width: '6rem',
  },
}));
const HeaderSection = () => {
  const { styles } = useHeaderStyles();
  return (
    <div className={styles.header}>
      <div className={styles.title}>欢迎回来</div>
      <div className={styles.text}>输入您的账户信息以开始管理您的博客</div>
      <img className={styles.welcomeImg} src={welcomeImg} alt="" />
    </div>
  );
};

type FieldType = {
  account: string;
  password: string;
  captcha: boolean;
};
const useContentStyles = createStyles(({ token }) => ({
  content: {
    width: '100%',
    overflow: 'hidden',
    padding: '0.8rem 0.8rem 0 0.8rem',
  },
  formItem: {
    marginBottom: '1rem',
    position: 'relative',
  },
  formItemLite: {
    marginBottom: '0.5rem',
  },
  formItemLast: {
    marginBottom: '0',
  },
  input: {
    height: '2.25rem',
  },
  forget: {
    // color: '#2563eb',
    color: token.colorPrimary,
    cursor: 'pointer',
  },
  button: {
    height: '2.5rem',
  },
}));
const ContentSection = () => {
  const { styles } = useContentStyles();

  const { onUpdatePageType } = usePageType();
  const [rememberMe, setRememberMe] = useState(getItem('rememberMe'));

  const [initialValues] = useState(() => {
    return getItem('rememberMe')
      ? {
          account: getItem('account')!,
          password: getItem('password')!,
          captcha: false,
        }
      : {
          account: '',
          password: '',
          captcha: false,
        };
  });

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  // 提交登录表单
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    const { account, password } = values;
    const { code, user, token } = await login({
      type: 'account',
      account: account,
      password: password,
    });
    if (code == 1) {
      console.log(token, user, account);
      dispatch(setUserInfo({ token, userInfo: user }));
      if (rememberMe) {
        setItem('rememberMe', true);
        setItem('account', account);
        setItem('password', password);
      } else {
        setItem('rememberMe', false);
      }
      messageApi.success('登录成功');
      navigate('/');
    } else {
      messageApi.error('登录失败');
    }
  };

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
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="账号"
          name="account"
          className={styles.formItem}
          rules={[
            {
              required: true,
              message: <CustomErrorHelp errors="账号不能为空" />,
            },
          ]}
        >
          <Input className={styles.input} placeholder="请输入账号..." />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          className={styles.formItem}
          rules={[
            {
              required: true,
              message: <CustomErrorHelp errors="密码不能为空" />,
            },
          ]}
        >
          <Input.Password
            className={styles.input}
            placeholder="请输入密码..."
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="captcha"
          label="滑块验证"
          className={styles.formItemLite}
          rules={[
            {
              required: true,
              message: <CustomErrorHelp errors="请完成滑块验证" />,
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(),
            },
          ]}
        >
          <SlideCaptcha />
        </Form.Item>

        <Form.Item className={styles.formItem}>
          <Flex justify="space-between">
            <Checkbox
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            >
              记住账号
            </Checkbox>
            <div
              className={styles.forget}
              onClick={() => onUpdatePageType('forget')}
            >
              忘记密码？
            </div>
          </Flex>
        </Form.Item>

        <Form.Item className={styles.formItemLast}>
          <Button
            type="primary"
            className={styles.button}
            block={true}
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const useFootStyles = createStyles(({ token }) => ({
  footer: {
    width: '100%',
    overflow: 'hidden',
    padding: '0 1.5rem',
    marginTop: '1rem',
  },
  button: {
    width: '48%',
    height: '2.5rem',
  },
  tips: {
    marginTop: '1rem',
    color: '#737373',
    fontSize: '0.8rem',
  },
  register: {
    // color: '#2563eb',
    color: token.colorPrimary,
    cursor: 'pointer',
  },
}));
const FooterSection = () => {
  const { onUpdatePageType } = usePageType();
  const { styles } = useFootStyles();
  return (
    <div className={styles.footer}>
      <Flex justify="space-between">
        <Button
          className={styles.button}
          onClick={() => onUpdatePageType('mail')}
        >
          邮箱登录
        </Button>
        <Button
          className={styles.button}
          onClick={() => onUpdatePageType('phone')}
        >
          手机登录
        </Button>
      </Flex>
      <Flex justify="center" className={styles.tips}>
        还没有账号？
        <span
          className={styles.register}
          onClick={() => onUpdatePageType('register')}
        >
          创建新账号
        </span>
      </Flex>
    </div>
  );
};

const LoginByAccount = () => {
  return (
    <>
      <HeaderSection />
      <ContentSection />
      <FooterSection />
    </>
  );
};

export default LoginByAccount;
