# import.meta

> 是一个给 js 模块暴露特定上下文的元数据属性的对象。

1. 什么是 js 模块

   指浏览器原生支持的模块方案，即 type="module"的 script 脚本。只有且仅有声明了该类型的脚本内部才能使用模块化方案，即 import 和 export 语法。

```html
<script type="module" src="./index.js" />
// or
<script type="module">
  import a from "./index.js";
</script>
```

2. console.log(import)为什么会报错

   因为 import 在模块中只有两种意义：

   - 作为关键字，起到导入模块的作用
   - import()，代表函数，动态导入模块。

3. import.meta

   返回一个包含了当前模块绝对路径信息的对象。该对象添加属性。

   ```js
   {
     url: "当前模块的绝对路径";
   }
   ```

4. import 还有其他属性吗
   没有了！只有 import.meta
