import { useState } from 'react';
import { Flex } from 'antd';
import { createStyles } from 'antd-style';
import { PageTypeProvider } from './context/PageTypeContext';

import LoginByAccount from './LoginByAccount';
import LoginByEmail from './LoginByEmail';
import LoginByQRcode from './LoginBySms';
import ForgetPassword from './ForgetPassword';
import RegisterAccount from './RegisterAccount';

import { fadeOutDown, fadeUp } from '@/styles/animation';
import backgroundImg from '@/assets/images/background.png';

type PageType = 'account' | 'mail' | 'phone' | 'forget' | 'reset' | 'register';

const useStyles = createStyles(() => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    animation: `${fadeUp} 0.2s ease-in forwards`,
    padding: '10% 15%',
    borderRadius: '1rem',
    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  exiting: {
    animation: `${fadeOutDown} 0.2s ease-out forwards`,
  },
}));
const AuthIndex = () => {
  const [pageType, setPageType] = useState<PageType>(
    (sessionStorage.getItem('pageType') as PageType) || 'account'
  );
  const [isExiting, setIsExiting] = useState(false);
  const { styles, cx } = useStyles();

  const handleUpdatePageType = (type: PageType) => {
    if (type === pageType) return;
    setIsExiting(true);
    // 等待退出动画完成后再切换内容
    setTimeout(() => {
      setPageType(type);
      sessionStorage.setItem('pageType', type);
      setIsExiting(false);
    }, 200);
  };
  return (
    <PageTypeProvider onUpdatePageType={handleUpdatePageType}>
      <Flex justify="center" align="center" className={styles.root}>
        <div className={styles.cardContainer}>
          <div
            className={cx(styles.content, isExiting && styles.exiting)}
            key={pageType}
          >
            {pageType == 'account' && <LoginByAccount />}
            {pageType == 'mail' && <LoginByEmail />}
            {pageType == 'phone' && <LoginByQRcode />}
            {pageType == 'forget' && <ForgetPassword />}
            {pageType == 'register' && <RegisterAccount />}
          </div>
        </div>
      </Flex>
    </PageTypeProvider>
  );
};

export default AuthIndex;
