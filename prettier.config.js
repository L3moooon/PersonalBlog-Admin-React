export default {
  // 缩进：2 个空格（React 主流规范）
  tabWidth: 2,
  // 使用空格缩进（替代 Tab）
  useTabs: false,
  // 结尾添加分号
  semi: true,
  // 使用单引号（React 生态主流）
  singleQuote: true,
  // 仅在需要时为对象属性添加引号（如特殊字符）
  quoteProps: 'as-needed',
  // JSX 中使用双引号（React 官方推荐，避免与 HTML 属性冲突）
  jsxSingleQuote: false,
  // 尾随逗号：ES2020 语法（数组/对象最后一项加逗号，便于 git 对比）
  trailingComma: 'es5',
  // 换行长度：超过 80 字符换行
  printWidth: 80,
  // 对象字面量大括号两侧加空格（{ foo: bar }）
  bracketSpacing: true,
  // 箭头函数单个参数时省略括号（(x) => x → x => x）
  arrowParens: 'avoid',
  // 换行符：LF（跨平台兼容）
  endOfLine: 'lf',
  // HTML/JSX 标签闭合位置：多行标签最后一行末尾闭合（如 <div>...</div>）
  bracketSameLine: false,
  // 忽略 node_modules、打包目录等文件
  overrides: [
    {
      files: ['*.md', '*.json'],
      options: {
        printWidth: 100,
      },
    },
  ],
};
