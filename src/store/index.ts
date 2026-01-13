import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
import { encryptTransform } from 'redux-persist-transform-encrypt';

import userReducer from './slices/userSlice'; //导入切片
import ossReducer from './slices/ossSlice'; //导入切片

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_PERSIST_SECRET_KEY,
  onError: function (error) {
    console.error('redux-persist 加密/解密失败：', error);
  },
});

const rootReducer = combineReducers({
  user: userReducer,
  oss: ossReducer,
});

//配置全局store
export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root', // 持久化的根 key
      storage: storage, // 存储引擎：localStorage
      whitelist: ['user', 'oss'], // 白名单
      // blacklist: ['temp'], // 黑名单，与白名单二选一
      transforms: [encryptor], // 使用加密转换
    },
    rootReducer
  ),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// 类型导出（TS 项目需要）
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
