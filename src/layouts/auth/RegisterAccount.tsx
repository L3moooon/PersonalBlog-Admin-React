import { Button, Form, Input, type FormProps } from 'antd';
import { createStyles } from 'antd-style';
import { usePageType } from './context/PageTypeContext';
import { register } from '@/api/auth';
import registerImg from '@/assets/images/register.png';

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
  registerImg: {
    position: 'absolute',
    right: '1.5rem',
    top: '-1rem',
    width: '8rem',
  },
}));
const HeaderSection = () => {
  const { styles } = useHeaderStyles();
  return (
    <div className={styles.header}>
      <div className={styles.title}>注册账号</div>
      <div className={styles.text}>注册账号以查看站点相关信息</div>
      <img className={styles.registerImg} src={registerImg} alt="" />
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
    padding: '0.8rem',
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
    marginTop: '1.5rem',
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
  buttonLast: {
    height: '2.5rem',
    marginTop: '1rem',
  },
}));
const ContentSection = () => {
  const { styles } = useContentStyles();

  const { onUpdatePageType } = usePageType();
  // 提交登录表单
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    const { account, password } = values;
    const { code } = await register({
      account: account,
      password: password,
      name: account,
    });
    if (code == 1) {
      messageApi.success('注册成功');
      onUpdatePageType('account'); //跳转到登录界面
    } else {
      messageApi.error('注册失败');
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
          label="重复密码"
          className={styles.formItemLast}
          rules={[
            {
              required: true,
              message: <CustomErrorHelp errors="请确认输入密码" />,
            },
          ]}
        >
          <Input.Password
            className={styles.input}
            placeholder="请输入密码..."
          />
        </Form.Item>

        <Form.Item className={styles.formItemLast}>
          <Button
            type="primary"
            className={styles.button}
            block={true}
            htmlType="submit"
          >
            注册
          </Button>
          <Button
            type="default"
            className={styles.buttonLast}
            block={true}
            onClick={() => onUpdatePageType('account')}
          >
            返回登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const RegisterAccount = () => {
  return (
    <>
      <HeaderSection />
      <ContentSection />
    </>
  );
};

export default RegisterAccount;
