import RouterConfig from './router';
import { useNavigate } from 'react-router-dom';
import { setMessageApi, setNavigate } from './utils/globalInstance';
import { message } from 'antd';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { type RootState } from '@/store';

const App = () => {
  //全局实例
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  setNavigate(navigate);
  setMessageApi(messageApi);

  // const permission = useSelector(
  //   (state: RootState) => state.user.userInfo?.role
  // );
  //路由鉴权
  // useEffect(() => {}, [navigate]);
  return (
    <>
      {contextHolder}
      <RouterConfig />
    </>
  );
};
export default App;
