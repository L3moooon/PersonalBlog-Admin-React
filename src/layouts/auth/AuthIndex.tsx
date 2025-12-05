import LoginByMail from '../auth/login/LoginByEmail';
import LoginByQRcode from '../auth/login/LoginByQRcode';
import LoginByAccount from '../auth/login/LoginByAccount';
import ForgetPassword from '../auth/forget/ForgetPassword';

import { useState } from 'react';

type PageType = 'account' | 'mail' | 'phone' | 'forget' | 'reset';

const BasicIndex = () => {
  const [pageType, setPageType] = useState<PageType>('account');
  //改变页面类型
  const handleUpdatePageType = (type: PageType) => {
    setPageType(type);
  };
  return (
    <div className="w-screen h-screen bg-[url('@/assets/images/background.png')] bg-cover flex justify-center items-center">
      <div className="aspect-[4/3] w-2/5 relative">
        {pageType == 'account' && (
          <LoginByAccount
            pageType={pageType}
            onUpdatePageType={handleUpdatePageType}
          />
        )}
        {pageType == 'mail' && <LoginByMail />}
        {pageType == 'phone' && <LoginByQRcode />}
        {pageType == 'forget' && <ForgetPassword />}
      </div>
    </div>
  );
};

export default BasicIndex;
