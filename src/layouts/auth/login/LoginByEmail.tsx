import { createStyles } from 'antd-style';
import { Flex, Button, Form, Input, message, type FormProps } from 'antd';
import { usePageType } from '../context/PageTypeContext';
import { useState, useEffect } from 'react';
import { login } from '@/api/auth';
import mailBoxImg from '@/assets/images/mailbox.png';

import { useDispatch, useSelector } from 'react-redux'; // 导入 Hooks
import { type RootState, type AppDispatch } from '@/store'; // 导入类型
import { setUserInfo } from '@/store/slices/userSlice';
import { messageApi } from '@/utils/globalInstance';

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
  mailBoxImg: {
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
      <div className={styles.text}>请输入您的邮箱获取验证码登录</div>
      <img className={styles.mailBoxImg} src={mailBoxImg} alt="" />
    </div>
  );
};
type FieldType = {
  email: string;
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
    height: '2.5rem',
  },
}));
const ContentSection = () => {
  const { styles } = useContentStyles();
  const { onUpdatePageType } = usePageType();
  const [loading, setLoading] = useState(false);
  const [waitTime, setWaitTime] = useState(60);
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    console.log('Success:', values);
    const { email, verificationCode } = values;
    const { code, user, token } = await login({
      type: 'email',
      email,
      verificationCode,
    });
    if (code == 1) {
      dispatch(setUserInfo({ token, userInfo: user }));
      messageApi.success('登录成功');
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="邮箱"
          name="email"
          className={styles.formItem}
          rules={[{ required: true, message: '账号不能为空' }]}
        >
          <Input className={styles.input} placeholder="请输入账号..." />
        </Form.Item>

        <Form.Item<FieldType>
          label="验证码"
          name="verificationCode"
          className={styles.formItemLast}
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Flex justify="space-between">
            <Input.OTP length={6} className={styles.input} />
            <Button
              className={styles.button}
              loading={loading}
              disabled={loading || !email || waitTime > 0}
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

const LoginByEmail = () => {
  return (
    <>
      <HeaderSection />
      <ContentSection />
    </>
  );
};

export default LoginByEmail;
