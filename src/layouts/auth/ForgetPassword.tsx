import { Button, Form, Input, type FormProps } from 'antd';
import { createStyles } from 'antd-style';
import { usePageType } from './context/PageTypeContext';
import { forgetPassword } from '@/api/auth';
import forgetImg from '@/assets/images/empty.png';

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
  forgetImg: {
    position: 'absolute',
    right: '1.5rem',
    top: '-1rem',
    width: '7rem',
  },
}));
const HeaderSection = () => {
  const { styles } = useHeaderStyles();
  return (
    <div className={styles.header}>
      <div className={styles.title}>忘记密码</div>
      <div className={styles.text}>请输入您账号绑定的邮箱重置密码</div>
      <img className={styles.forgetImg} src={forgetImg} alt="" />
    </div>
  );
};

type FieldType = {
  account: string;
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
    const { account } = values;
    const { code } = await forgetPassword({
      account: account,
    });
    if (code == 1) {
      messageApi.success('一封重置密码的邮件已发送到您的邮箱，请注意查收');
      // onUpdatePageType('account'); //跳转到登录界面
    } else {
      messageApi.error('重置密码失败');
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
          name="account"
          className={styles.formItem}
          rules={[
            {
              required: true,
              message: <CustomErrorHelp errors="邮箱不能为空" />,
            },
          ]}
        >
          <Input className={styles.input} placeholder="请输入邮箱..." />
        </Form.Item>
        <Form.Item className={styles.formItemLast}>
          <Button
            type="primary"
            className={styles.button}
            block={true}
            htmlType="submit"
          >
            重置密码
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

const ForgetPassword = () => {
  return (
    <>
      <HeaderSection />
      <ContentSection />
    </>
  );
};

export default ForgetPassword;
