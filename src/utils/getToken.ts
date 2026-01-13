import { getStoredState } from 'redux-persist';
import { persistConfig, type RootState } from '@/store';

export const getToken = async () => {
  try {
    const persistState = (await getStoredState(persistConfig)) as
      | RootState
      | undefined;
    const token = persistState?.user?.token;
    return token;
  } catch (error) {
    console.error('获取token失败：', error);
    return '';
  }
};
