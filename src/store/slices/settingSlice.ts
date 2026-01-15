import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 定义初始状态
interface SettingState {
  //主题
  theme: 'light' | 'dark' | 'system';
  innerColorTheme: string;

  //布局
  showSidebar: boolean;
  showHeader: boolean;
  showBreadcrumb: boolean;
  showTabSet: boolean;

  //快捷键
  shrotCut: boolean;
  shortCutKey: {
    globalSearch: boolean;
    logout: boolean;
    lockScreen: boolean;
  };
  //通用
}

const initialState: SettingState = {
  theme: 'system',
  innerColorTheme: '',
  shrotCut: true,
  shortCutKey: {
    globalSearch: true,
    logout: true,
    lockScreen: true,
  },

  showSidebar: true,
  showHeader: true,
  showBreadcrumb: true,
  showTabSet: true,
};

// 创建用户切片
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    // 修改主题
    setTheme: (state, action: PayloadAction<SettingState['theme']>) => {
      state.theme = action.payload;
    },
    //修改内置主题
    setInnerColorTheme: (state, action: PayloadAction<string>) => {
      state.innerColorTheme = action.payload;
    },
    //修改快捷键
    setShrotCut: (state, action: PayloadAction<boolean>) => {
      state.shrotCut = action.payload;
    },
    //修改快捷键内容
    setShortCutKey: (
      state,
      action: PayloadAction<SettingState['shortCutKey']>
    ) => {
      state.shortCutKey = action.payload;
    },
    //修改布局
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
    setShowHeader: (state, action: PayloadAction<boolean>) => {
      state.showHeader = action.payload;
    },
    setShowBreadcrumb: (state, action: PayloadAction<boolean>) => {
      state.showBreadcrumb = action.payload;
    },
    setShowTabSet: (state, action: PayloadAction<boolean>) => {
      state.showTabSet = action.payload;
    },
  },
});

// 导出同步 action
export const {
  setTheme,
  setInnerColorTheme,
  setShrotCut,
  setShortCutKey,
  setShowSidebar,
  setShowHeader,
  setShowBreadcrumb,
  setShowTabSet,
} = settingSlice.actions;

// 导出切片
export default settingSlice.reducer;
