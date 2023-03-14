// https://www.prettier.cn/docs/options.html prettier配置项地址
module.exports = {
  printWidth: 150, //换行长度
  tabWidth: 2, //缩进
  useTabs: false, //是否使用tab缩进
  semi: true, //分号
  singleQuote: true, //是否单引号
  quoteProps: 'as-needed', //对象中是否需要引号 as-needed：尽在需要时
  jsxSingleQuote: false, //jsx中使用单引号
  trailingComma: 'es5', //尾随逗号
  bracketSpacing: true, //对象括号之间空格
  bracketSameLine: true, //将>多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾
  arrowParens: 'always', //箭头函数参数使用括号 always：使用，avoid：不使用
  requirePragma: false,//需要编译指示
  insertPragma: false, //插入编译指示
  proseWrap: 'never', //markdown中使用
  htmlWhitespaceSensitivity: 'strict',//HTML 空白敏感性 css：css中重要，strict：所有标签周围的空格都是重要的，ignore：全部不重要
  vueIndentScriptAndStyle: false, //Vue 文件脚本和样式标签缩进
  endOfLine: 'crlf',//行结束
  rangeStart: 0 //格式化范围
}
