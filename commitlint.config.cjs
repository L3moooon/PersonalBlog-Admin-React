//git提交规范
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"],
    ],
    "subject-empty": [2, "never"], // 提交描述不能为空
    "type-empty": [2, "never"], // 类型不能为空
    "subject-case": [0, "never"], // 提交描述首字母小写
    // "body-leading-blank": [1, "always"], // 提交体换行符限制
  },
};
