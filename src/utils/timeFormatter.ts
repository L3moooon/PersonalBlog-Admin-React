// 日期格式化工具函数
const timeFormatter = (date: string | Date, format = 'YYYY-MM-DD HH:mm:ss') => {
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

export default timeFormatter;
