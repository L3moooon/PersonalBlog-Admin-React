//创建antd全局message实例
import { message } from 'antd';

type MessageInstance = ReturnType<typeof message.useMessage>[0];

export let messageApi: MessageInstance;

export const setMessageApi = (api: MessageInstance) => {
  messageApi = api;
};

//创建navigator全局实例
import { type NavigateFunction } from 'react-router-dom';

export let navigate: NavigateFunction;
export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};
