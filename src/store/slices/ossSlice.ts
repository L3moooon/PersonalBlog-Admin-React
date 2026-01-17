import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import OSS from 'ali-oss';
import { getAliSts } from '@/api/public';

/**
 * 缓存客户端实例，避免将 OSS 实例存储在 Redux Store 中。
 * Redux Store 应该只存储可序列化的数据，而 OSS 实例包含方法，
 * 存储并在页面刷新（通过 redux-persist 恢复）后会丢失原型鏈上的方法，
 * 从而导致 "multipartUpload is not a function" 错误。
 */
const clientCache: Record<string, OSS> = {};

// 定义状态类型
interface OSSState {
  progressList: { [key: string]: number };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: OSSState = {
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
  async ({ key, file }: UploadFileParams, { dispatch, rejectWithValue }) => {
    try {
      let client = clientCache[key];

      // 1. 如果本地缓存中没有客户端，则初始化
      if (!client) {
        const response = await getAliSts();
        const { data } = response;
        client = new OSS({
          region: data.region,
          accessKeyId: data.accessKeyId,
          accessKeySecret: data.accessKeySecret,
          stsToken: data.securityToken,
          bucket: 'willi-bucket',
          secure: true, // 建议开启 HTTPS，阿里云默认域名自带证书
          endpoint: 'oss.willisblog.cn',
          cname: true,
          refreshSTSToken: async () => {
            const res = await getAliSts();
            return {
              accessKeyId: res.data.accessKeyId,
              accessKeySecret: res.data.accessKeySecret,
              stsToken: res.data.securityToken,
            };
          },
        });
        // 存入本地缓存
        clientCache[key] = client;
      }
      console.log('文件名:', file.name);
      // OSS 的 Key 通常不建议以 / 开头
      const objectKey = `upload/article/${file.name}`;

      // 2. 使用 multipartUpload 上传以支持进度条
      const result = await client.multipartUpload(objectKey, file, {
        parallel: 4, // 建议并发数不要设得过高，4-5 比较稳健
        partSize: 1024 * 1024, // 设置分片大小为 1MB
        progress: (p: number) => {
          dispatch(setProgress({ key, progress: Math.floor(p * 100) }));
        },
      });

      return { key, result };
    } catch (error: unknown) {
      console.error('OSS 上传失败:', error);
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
    // 清除指定 key 的进度
    clearProgress: (state, action: PayloadAction<string>) => {
      delete state.progressList[action.payload];
    },
    // 如果需要强制刷新客户端，可以清除缓存
    clearOSSClient: (_, action: PayloadAction<string>) => {
      delete clientCache[action.payload];
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
export const { setProgress, clearProgress, clearOSSClient } = ossSlice.actions;
// 默认导出 reducer
export default ossSlice.reducer;
