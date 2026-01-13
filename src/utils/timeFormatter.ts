// 日期格式化工具函数
export const timeFormatter = (
  date: string | Date,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  if (!date) return '';

  // 处理字符串类型日期
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  // 日期无效时返回空字符串（或原始字符串，如果是字符串类型）
  if (isNaN(targetDate.getTime())) return typeof date === 'string' ? date : '';

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  // 简单格式化逻辑（可根据需要扩展）
  if (format === 'YYYY-MM-DD') {
    return targetDate
      .toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '-');
  }

  // 完整格式
  return targetDate.toLocaleString('zh-CN', options).replace(/\//g, '-');
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  // 月份补0 01-12
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  // 日期补0 01-31
  const day = date.getDate().toString().padStart(2, '0');
  // 小时补0 00-23
  const hours = date.getHours().toString().padStart(2, '0');
  // 分钟补0 00-59
  const minutes = date.getMinutes().toString().padStart(2, '0');
  // 秒数补0 00-59
  const seconds = date.getSeconds().toString().padStart(2, '0');
  // 星期转换 0=周日 1=周一 ... 6=周六
  const weekArr = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  const week = weekArr[date.getDay()];
  // 返回拼接后的时间格式，可按需修改
  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    week,
  };
};
