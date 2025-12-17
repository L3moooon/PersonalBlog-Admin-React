import { useState } from 'react';
import { createStyles } from 'antd-style';
import { Flex } from 'antd';
import LoginByAccount from './login/LoginByAccount';
import backgroundImg from '@/assets/images/background.png';

type PageType = 'account' | 'mail' | 'phone' | 'forget' | 'reset';

const useStyles = createStyles(() => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
  },
  cardContainer: {
    aspectRatio: '4/3',
    width: '40%',
    position: 'relative',
    opacity: 0.9,
  },
}));

const BasicIndex = () => {
  const [pageType, setPageType] = useState<PageType>('account');
  // 引入样式类名
  const { styles } = useStyles();

  // 改变页面类型
  const handleUpdatePageType = (type: PageType) => {
    setPageType(type);
  };

  return (
    <Flex justify="center" align="center" className={styles.root}>
      <div className={styles.cardContainer}>
        {pageType == 'account' && <LoginByAccount />}
        {/* {pageType == 'mail' && <LoginByMail />}
        {pageType == 'phone' && <LoginByQRcode />}
        {pageType == 'forget' && <ForgetPassword />} */}
      </div>
    </Flex>
  );
};

export default BasicIndex;
