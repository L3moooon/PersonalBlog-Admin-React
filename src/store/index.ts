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
import settingReducer from './slices/settingSlice'; //导入切片

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_PERSIST_SECRET_KEY,
  onError: function (error) {
    console.error('redux-persist 加密/解密失败：', error);
  },
});
export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'oss', 'setting'],
  transforms: [encryptor],
};
const rootReducer = combineReducers({
  user: userReducer,
  oss: ossReducer,
  setting: settingReducer,
});
//配置全局store
export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
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
