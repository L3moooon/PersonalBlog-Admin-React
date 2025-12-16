import { useState } from 'react';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';
import {
  Card,
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  type FormProps,
} from 'antd';
import welcomeImg from '@/assets/images/welcome-en.png';

const useHeaderStyles = createStyles(() => ({
  header: {
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
      <div className={clsx(styles.title, 'flex-vertical-center')}>欢迎回来</div>
      <div className={styles.text}>输入您的账户信息以开始管理您的博客</div>
      <img className={styles.welcomeImg} src={welcomeImg} alt="" />
    </div>
  );
};
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const useContentStyles = createStyles(() => ({
  content: {
    width: '100%',
    overflow: 'hidden',
    padding: '0.8rem',
  },
  welcomeImg: {
    position: 'absolute',
    right: 0,
    top: 0,
    // width: '0.1rem',
  },
}));
const ContentSection = () => {
  const { styles } = useContentStyles();
  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={clsx(styles.content, 'flex-center')}>
      <Form
        className={styles.content}
        name="basic"
        layout="vertical"
        requiredMark={false}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="账号"
          name="username"
          rules={[{ required: true, message: '账号不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>记住账号</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const FooterSection = () => {
  return <div>底部</div>;
};

const useRootStyles = createStyles(() => ({
  root: {
    padding: '10% 15%',
    borderRadius: '1rem',
    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
}));
const LoginByAccount = () => {
  const { styles } = useRootStyles();
  return (
    <div className={styles.root}>
      <HeaderSection />
      <ContentSection />
      <FooterSection />
    </div>
  );
};
export default LoginByAccount;
