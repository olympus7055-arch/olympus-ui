/// <reference types="vite/client" />

// 统一样式模块声明（关键：使用 readonly 保证类型安全）
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// 同时声明无 .module 后缀的样式文件（如果项目中有直接导入）
declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}