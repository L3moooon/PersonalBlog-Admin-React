import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse } from '@/api/auth/type';
// 定义初始状态
interface UserState {
  userInfo: LoginResponse['user'] | null;
  token: string;
  savedAccount: string;
  savedPassword: string;
  lockScreen: boolean;
  lockScreenPassword: string;
}

const initialState: UserState = {
  //用户信息
  userInfo: null,
  token: '',
  //保存账号密码
  savedAccount: '',
  savedPassword: '',
  //锁屏
  lockScreen: false,
  lockScreenPassword: '',
};

// 创建用户切片
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 登录成功：更新状态并保存到 localStorage
    setUserInfo: (
      state,
      action: PayloadAction<{ token: string; userInfo: LoginResponse['user'] }>
    ) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    // 退出登录：清空状态并删除本地存储
    logout: state => {
      state.token = '';
      state.userInfo = null;
    },
    // 保存账号密码
    saveAccount: (
      state,
      action: PayloadAction<{ account: string; password: string }>
    ) => {
      state.savedAccount = action.payload.account;
      state.savedPassword = action.payload.password;
    },
    //锁屏
    setLockScreen: (state, action: PayloadAction<boolean>) => {
      state.lockScreen = action.payload;
    },
    //锁屏密码
    setLockScreenPassword: (state, action: PayloadAction<string>) => {
      state.lockScreenPassword = action.payload;
    },
  },
});

// 导出同步 action
export const {
  setUserInfo,
  logout,
  saveAccount,
  setLockScreen,
  setLockScreenPassword,
} = userSlice.actions;

// 导出切片
export default userSlice.reducer;
