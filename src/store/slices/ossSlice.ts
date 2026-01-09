import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import OSS from 'ali-oss';
import { getAliSts } from '@/api/public';

// 定义状态类型
interface OSSState {
  clientList: { [key: string]: OSS };
  progressList: { [key: string]: number };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: OSSState = {
  clientList: {},
  progressList: {},
  status: 'idle',
};

/**
 * 异步 Action：初始化并上传文件
 */
type UploadFileParams = {
  key: string;
  file: File;
};

export const uploadFile = createAsyncThunk(
  'oss/uploadFile',
  async (
    { key, file }: UploadFileParams,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { oss: OSSState };
      let client = state.oss.clientList[key];

      // 1. 如果客户端不存在，则初始化
      if (!client) {
        const response = await getAliSts();
        const { data } = response;
        client = new OSS({
          region: data.region,
          accessKeyId: data.accessKeyId,
          accessKeySecret: data.accessKeySecret,
          stsToken: data.securityToken,
          bucket: 'willi-bucket',
          endpoint: 'oss.willisblog.com',
          secure: true,
          cname: true,
        });
        // 保存客户端到 state
        dispatch(saveClient({ key, client }));
      }

      // 2. 使用 multipartUpload 上传以支持进度条
      const result = await client.multipartUpload(file.name, file, {
        progress: (p: number) => {
          dispatch(setProgress({ key, progress: Math.floor(p * 100) }));
        },
      });

      return { key, result };
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || '上传异常');
    }
  }
);

const ossSlice = createSlice({
  name: 'oss',
  initialState,
  reducers: {
    setProgress: (
      state,
      action: PayloadAction<{ key: string; progress: number }>
    ) => {
      state.progressList[action.payload.key] = action.payload.progress;
    },
    clearClient: (state, action: PayloadAction<string>) => {
      delete state.clientList[action.payload];
    },
    // 将客户端实例保存到状态中
    saveClient: (
      state,
      action: PayloadAction<{ key: string; client: OSS }>
    ) => {
      state.clientList[action.payload.key] = action.payload.client;
    },
  },
  extraReducers: builder => {
    builder
      // 处理 uploadFile 的状态
      .addCase(uploadFile.pending, state => {
        state.status = 'loading';
      })
      .addCase(uploadFile.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(uploadFile.rejected, state => {
        state.status = 'failed';
      });
  },
});

// 导出同步 Action
export const { setProgress, clearClient, saveClient } = ossSlice.actions;
// 默认导出 reducer
export default ossSlice.reducer;
