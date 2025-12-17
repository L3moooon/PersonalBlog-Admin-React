import { createStyles } from 'antd-style';
import {
  Flex,
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
      <div className={styles.title}>欢迎回来</div>
      <div className={styles.text}>输入您的账户信息以开始管理您的博客</div>
      <img className={styles.welcomeImg} src={welcomeImg} alt="" />
    </div>
  );
};
type FieldType = {
  username?: string;
  password?: string;
  captcha?: boolean;
  remember?: string;
};
const useContentStyles = createStyles(() => ({
  content: {
    width: '100%',
    overflow: 'hidden',
    padding: '0.8rem',
  },
  formItem: {
    marginBottom: '0',
  },
  welcomeImg: {
    position: 'absolute',
    right: 0,
    top: 0,
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
    <div className={styles.content}>
      <Form
        className={styles.content}
        name="basic"
        layout="vertical"
        requiredMark={false}
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
          <Input className={styles.input} placeholder="请输入账号..." />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          className={styles.formItem}
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password
            className={styles.input}
            placeholder="请输入密码..."
          />
        </Form.Item>

        <Form.Item<FieldType> name="remember" label={null}>
          <Flex justify="space-between">
            <Checkbox>记住账号</Checkbox>
            <div>忘记密码？</div>
          </Flex>
        </Form.Item>
        <Form.Item<FieldType> name="captcha" label="滑块验证"></Form.Item>

        <Form.Item label={null} className={styles.formItem}>
          <Button type="primary" block={true} htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const useFootStyles = createStyles(() => ({
  footer: {
    width: '100%',
    overflow: 'hidden',
    padding: '0 1.5rem',
  },
  button: {
    width: '48%',
  },
}));
const FooterSection = () => {
  const { styles } = useFootStyles();
  return (
    <div className={styles.footer}>
      <Flex justify="space-between">
        <Button className={styles.button}>邮箱登录</Button>
        <Button className={styles.button}>手机登录</Button>
      </Flex>
      <Flex justify="center">
        还没有账号?
        <span className={styles.register}>创建新账号</span>
      </Flex>
    </div>
  );
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
