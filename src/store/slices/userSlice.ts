import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 定义初始状态
interface UserState {
  userInfo: { id: string; name: string; role: string } | null;
  token: string;
}

const initialState: UserState = {
  userInfo: null,
  token: '',
};

// 创建用户切片
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 登录成功：更新状态并保存到 localStorage
    setUserInfo: (
      state,
      action: PayloadAction<{ token: string; userInfo: any }>
    ) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    // 退出登录：清空状态并删除本地存储
    logout: state => {
      state.token = '';
      state.userInfo = null;
    },
  },
});

// 导出同步 action
export const { setUserInfo, logout } = userSlice.actions;

// 导出切片
export default userSlice.reducer;
