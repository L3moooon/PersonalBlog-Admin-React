module.exports = {
  // JS/TS/Vue 文件：eslint 修复 + prettier 格式化
  "*.{js,jsx,ts,tsx,vue}": ["eslint --fix", "prettier --write"],
  // CSS/Scss 文件：stylelint 修复 + prettier 格式化
  "*.{css,scss,less}": ["stylelint --fix", "prettier --write"],
  // 纯文本文件：仅 prettier 格式化
  "*.{json,md,yml,yaml}": ["prettier --write"],
};
