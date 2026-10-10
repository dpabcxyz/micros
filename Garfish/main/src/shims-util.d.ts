// util (node built-in browser polyfill) 没有自带 TS 声明，这里兜底。
declare module 'util' {
  const util: any
  export = util
}
