export const getPersistItem = (store: string, key: string) => {
  try {
    // 读取 redux-persist 存储的根数据（默认 key 是 persist:root）
    const persistData = localStorage.getItem('persist:root');
    if (!persistData) return null;

    // 解析根数据，再解析 user 模块的序列化数据
    const data = JSON.parse(persistData);
    const storeData = JSON.parse(data[store]);
    console.log(storeData);

    return storeData[key] || null;
  } catch (error) {
    console.error('读取 token 失败：', error);
    return null;
  }
};

export const getItem = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return JSON.parse(data!);
  } catch (error) {
    console.error('读取失败：', error);
    return null;
  }
};

export const setItem = (
  key: string,
  value: string | number | boolean | object
) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('保存失败：', error);
  }
};
