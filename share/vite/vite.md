# vite

1. [简介](###简介)
2. [如何使用](###如何使用)
3. [原理](###原理)
4. [构建工具对比](###构建工具对比)
5. [项目应用](###项目应用)

### 简介

> vite 是一个开发阶段使用原生 [ES imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)，生产阶段使用 rollup 的构建工具。具有以下特点：
>
> - 快速的冷服务启动（？？？是什么，为什么，优势，实现）
> - 模块热更新（？？？什么是热更新，实现，区别）
> - 真正的按需编译（what？why？how？）
> - 支持 TypeScript

### 如何使用

新项目：

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

已有项目改造：

### 原理

#### ES Module

```html
<script type="module">
  import { add } from "./add.js";
  console.log(add(1, 2));
</script>
```

问题：

1. 后缀名省略后如何解析
2. 三方模块, es module 无法解析非相对路径的模块，必须符合三种路径格式`/`，`./`，`../`。vite 的解决思路是统一给模块加上`/@module/`前缀

```js
// import { createApp } from "vue"
import { createApp } from "/@module/vue";
```

3.

### 构建方式比较

### 项目中应用

#### 有哪些限制

1. Vue 只适配 vue3.x，相关库也必须要适配 3.x 的版本。（为什么会有这个限制？）

### 参考

1. [深入 vite 原理](https://www.tuicool.com/articles/EFJvEjf)
