import { useState } from 'react';
import { createStyles } from 'antd-style';
import { Flex } from 'antd';
import { PageTypeProvider } from './context/PageTypeContext';

import LoginByAccount from './login/LoginByAccount';
import LoginByEmail from './login/LoginByEmail';
import LoginByQRcode from './login/LoginByQRcode';
import ForgetPassword from './forget/ForgetPassword';
import backgroundImg from '@/assets/images/background.png';

type PageType = 'account' | 'mail' | 'phone' | 'forget' | 'reset' | 'register';

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
const AuthIndex = () => {
  const [pageType, setPageType] = useState<PageType>('account');
  const { styles } = useStyles();

  const handleUpdatePageType = (type: PageType) => {
    setPageType(type);
  };

  return (
    <PageTypeProvider onUpdatePageType={handleUpdatePageType}>
      <Flex justify="center" align="center" className={styles.root}>
        <div className={styles.cardContainer}>
          {pageType == 'account' && <LoginByAccount />}
          {pageType == 'mail' && <LoginByEmail />}
          {pageType == 'phone' && <LoginByQRcode />}
          {pageType == 'forget' && <ForgetPassword />}
          {/* {pageType == 'reset' && <ForgetPassword />}
          {pageType == 'register' && <ForgetPassword />} */}
        </div>
      </Flex>
    </PageTypeProvider>
  );
};

export default AuthIndex;
