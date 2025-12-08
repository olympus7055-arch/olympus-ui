// css-modules.d.ts
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

// 如果你的项目也使用了SCSS或Less，可以一并声明
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
}
