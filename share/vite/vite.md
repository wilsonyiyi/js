# vite

1. [简介](###简介)
2. [如何使用](###如何使用)
3. [原理](###原理)
4. [构建工具对比](###构建工具对比)
5. [项目应用](###项目应用)

### 简介

> vite 是一个不需要打包的开发阶段的服务器，在生产阶段使用 rollup 进行构建。具有以下特点：
>
> - 快速的冷启动
> - 模块热更新
> - 真正的按需编译

### 如何使用

```shell
# vue3.x
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev

# react
npm init vite-app --template react

# preact
npm init vite-app --template preact
```

### 原理

`cli:`
构建服务

```ts
(async () => {
  const { help, h, mode, m, version, v } = argv;
  const envMode = mode || m || defaultMode;
  const options = await resolveOptions(envMode);
  if (!options.command || options.command === "serve") {
    // 开发阶段启动服务
    runServe(options);
  } else if (options.command === "build") {
    runBuild(options);
  } else if (options.command === "optimize") {
    runOptimize(options);
  } else {
    console.error(chalk.red(`unknown command: ${options.command}`));
    process.exit(1);
  }
})();

async function runServe(options: UserConfig) {
  const server = require("./server").createServer(options);

  let port = options.port || 3000;
  let hostname = options.hostname || "localhost";
  const protocol = options.https ? "https" : "http";

  server.listen(port, () => {
    console.log(`  Dev server running at:`);
    const interfaces = os.networkInterfaces();
    console.log();
    require("debug")("vite:server")(`server ready in ${Date.now() - start}ms.`);
  });
}
```

问题：

1. 三方模块, es module 无法解析非相对路径的模块，必须符合三种路径格式`/`，`./`，`../`。vite 的解决思路是统一给模块加上`/@module/`前缀

```js
// import { createApp } from "vue"
import { createApp } from "/@module/vue";
```

3. 模块热更新

`热更新的步骤：`

```shell
1. .vue文件被编译成.js文件
2. 检测所有.js文件中的imports语句，rewrite路径引用，同时记录引用者与被引用者的关系用于HMR的分析
3. 文件变化的时候，会触发HMR分析，查找文件的引用者链条
```

### 构建工具比较
##### webpack、rollup、parcel
三者都有生成bundle操作，parcel零配置
##### snowpack

##### esbuild


### 项目中应用

#### 为什么不能用于 vue2.x

1. Vue 只适配 vue3.x，相关库也必须要适配 3.x 的版本。（为什么会有这个限制？）

### 参考

1. [深入 vite 原理](https://www.tuicool.com/articles/EFJvEjf)
2. [vite HMR 原理](https://juejin.im/post/5f0b419ff265da22bf12be56)
3. [vite 如何做到让 vue 本地开发更快速](https://developer.aliyun.com/article/761551)