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

import userReducer from './slices/userSlice'; //导入切片

const rootReducer = combineReducers({
  user: userReducer,
  // cart: cartReducer,
  // temp: tempReducer, // 临时状态，不持久化
});

//配置全局store
export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root', // 持久化的根 key
      storage: storage, // 存储引擎：localStorage
      whitelist: ['user'], // 只持久化 user 切片（白名单）
      // blacklist: ['temp'], // 不持久化 temp 切片（黑名单，与白名单二选一）
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
