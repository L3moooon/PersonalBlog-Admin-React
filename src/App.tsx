import RouterConfig from './router';
import { useNavigate } from 'react-router-dom';
import { setNavigate, setMessageApi } from './api/index';
import { message } from 'antd';

const App = () => {
  const [messageApi, contextHolder] = message.useMessage({ duration: 3 });
  const navigate = useNavigate();
  setNavigate(navigate); //在axios中使用navigate
  setMessageApi(messageApi); //在axios中使用message
  return (
    <>
      {contextHolder}
      <RouterConfig />
    </>
  );
};
export default App;
