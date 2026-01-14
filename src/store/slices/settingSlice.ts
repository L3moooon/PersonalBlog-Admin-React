import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 定义初始状态
interface SettingState {
  //主题
  theme: 'light' | 'dark' | 'system';
  innerColorTheme: string;

  //布局

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
  },
});

// 导出同步 action
export const { setTheme, setInnerColorTheme, setShrotCut, setShortCutKey } =
  settingSlice.actions;

// 导出切片
export default settingSlice.reducer;
