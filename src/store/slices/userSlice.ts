import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse } from '@/api/auth/type';
import { navigate } from '@/utils/globalInstance';
// 定义初始状态
export interface TabItem {
  title: string;
  path: string;
  icon: string;
}
interface UserState {
  userInfo: LoginResponse['user'] | null;
  token: string;
  savedAccount: string;
  savedPassword: string;
  lockScreen: boolean;
  lockScreenPassword: string;
  tabs: Array<TabItem>;
  activeKey: string;
  fixedTabs: Array<string>;
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
  //打开的标签页
  tabs: [],
  activeKey: '/dashboard', //激活的标签页
  fixedTabs: ['/dashboard'], //固定的标签页
};

// 提取切换默认标签页的公共逻辑
const activeDefaultTab = (state: UserState) => {
  if (!state.tabs.includes(state.activeKey)) {
    state.activeKey = state.tabs[state.tabs.length - 1];
    navigate(state.activeKey);
  }
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

      state.tabs = [];
      state.activeKey = '/dashboard';
      state.fixedTabs = ['/dashboard'];
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
    //添加标签页
    addTab: (state, action: PayloadAction<TabItem>) => {
      const { path } = action.payload;
      if (!state.tabs.some(tab => tab.path === path)) {
        state.tabs.push(action.payload);
      }
    },
    //切换标签页
    changeTab: (state, action: PayloadAction<string>) => {
      state.activeKey = action.payload;
      navigate(action.payload);
    },
    //删除标签页
    removeTab: (state, action: PayloadAction<string>) => {
      if (state.activeKey === action.payload) {
        state.activeKey = state.tabs[state.tabs.length - 1];
        navigate(state.activeKey);
      }
      state.tabs = state.tabs.filter(tab => tab.path !== action.payload);
    },
    //固定/取消固定
    togglePinTab: (state, action: PayloadAction<string>) => {
      if (state.fixedTabs.includes(action.payload)) {
        state.fixedTabs = state.fixedTabs.filter(tab => tab !== action.payload);
      } else {
        state.fixedTabs.push(action.payload);
      }
    },
    //关闭左侧Tab(保留固定的tab)
    closeLeftTabs: (state, action: PayloadAction<string>) => {
      const { path } = action.payload;
      const index = state.tabs.indexOf(path);
      state.tabs = state.tabs.filter(
        (tab, i) => i >= index && state.fixedTabs.includes(tab)
      );
      activeDefaultTab(state);
    },
    //关闭右侧Tab(保留固定的tab)
    closeRightTabs: (state, action: PayloadAction<string>) => {
      const index = state.tabs.indexOf(action.payload);
      state.tabs = state.tabs.filter(
        (tab, i) => i <= index && state.fixedTabs.includes(tab)
      );
      activeDefaultTab(state);
    },
    //关闭其他Tab(保留固定的tab)
    closeOtherTabs: (state, action: PayloadAction<string>) => {
      state.tabs = state.tabs.filter(
        tab => state.fixedTabs.includes(tab) || tab === action.payload
      );
      activeDefaultTab(state);
    },
    //关闭所有
    closeAllTabs: state => {
      state.tabs = state.fixedTabs;
      activeDefaultTab(state);
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
  addTab,
  changeTab,
  removeTab,
  togglePinTab,
  closeLeftTabs,
  closeRightTabs,
  closeOtherTabs,
  closeAllTabs,
} = userSlice.actions;

// 导出切片
export default userSlice.reducer;
