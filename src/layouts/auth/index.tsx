import { useState } from 'react';
import { Flex } from 'antd';
import { createStyles } from 'antd-style';
import { PageTypeProvider } from './context/PageTypeContext';

import LoginByAccount from './LoginByAccount';
import LoginByEmail from './LoginByEmail';
import LoginByQRcode from './LoginBySms';
import ForgetPassword from './ForgetPassword';
import RegisterAccount from './RegisterAccount';

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
    minWidth: '35rem',
    maxWidth: '50rem',
    position: 'relative',
    opacity: 0.9,
  },
  content: {
    padding: '10% 15%',
    borderRadius: '1rem',
    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
}));
const AuthIndex = () => {
  const [pageType, setPageType] = useState<PageType>(() => {
    return (sessionStorage.getItem('pageType') as PageType) || 'account';
  });
  const { styles } = useStyles();

  const handleUpdatePageType = (type: PageType) => {
    setPageType(type);
    sessionStorage.setItem('pageType', type);
  };
  return (
    <PageTypeProvider onUpdatePageType={handleUpdatePageType}>
      <Flex justify="center" align="center" className={styles.root}>
        <div className={styles.cardContainer}>
          <div className={styles.content}>
            {pageType == 'account' && <LoginByAccount />}
            {pageType == 'mail' && <LoginByEmail />}
            {pageType == 'phone' && <LoginByQRcode />}
            {pageType == 'forget' && <ForgetPassword />}
            {/* {pageType == 'reset' && <ForgetPassword />} */}
            {pageType == 'register' && <RegisterAccount />}
          </div>
        </div>
      </Flex>
    </PageTypeProvider>
  );
};

export default AuthIndex;
