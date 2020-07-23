const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const app = new Koa();
const compilerSFC = require("@vue/compiler-sfc");
const compilerDOM = require("@vue/compiler-dom");

function rewriteBareModule(content) {
  const reg = /from\s+['"]([^'"]+)['"]/g;
  return content.replace(reg, (match, moduleName) => {
    if (["/", "./", "../"].some((item) => moduleName.startsWith(item))) {
      return match;
    } else {
      return `from "/@module/${moduleName}"`;
    }
  });
}

function insertEnv(htmlContent) {
  return htmlContent.replace(
    '<script type="module">',
    `
        <script>
            window.process = {env: {NODE_ENV: "development"}}
        </script>
        <script type="module">
    `
  );
}

app.use(async (ctx, next) => {
  const {
    request: { url, query },
  } = ctx;
  // 1. parse index
  if (url === "/") {
    ctx.status = 200;
    const htmlContent = fs.readFileSync("./index.html", "utf-8");
    ctx.body = insertEnv(htmlContent);
  } else if (url.endsWith(".js")) {
    // 2. parse js
    // @example { url } : /index.js
    ctx.status = 200;
    ctx.type = "application/javascript";
    const content = fs.readFileSync(
      path.resolve(__dirname, url.slice(1)),
      "utf-8"
    );
    ctx.body = rewriteBareModule(content);
  } else if (url.startsWith("/@module/")) {
    // 3. bare module resolving
    const modulePath = path.resolve(
      __dirname,
      "node_modules",
      url.replace("/@module/", "")
    );
    const entryFilePath = require(`${modulePath}/package.json`).module;
    const entryFileContent = fs.readFileSync(
      path.resolve(modulePath, entryFilePath),
      "utf-8"
    );
    ctx.status = 200;
    ctx.type = "application/javascript";
    ctx.body = rewriteBareModule(entryFileContent);
  } else if (url.indexOf(".vue") > 0) {
    const theUrl = url.slice(1);
    const filePath = path.resolve(
      __dirname,
      query ? theUrl.substr(0, theUrl.indexOf("?")) : theUrl
    );
    console.log(filePath);
    const content = fs.readFileSync(filePath, "utf-8");
    const { descriptor } = compilerSFC.parse(content);
    if (!query.type) {
      // 构造原始.vue文件数据的返回
      const newContent = rewriteBareModule(`
      ${descriptor.script.content.replace("export default", "const __script =")}
      import { render as __render } from "${url}?type=template"
      __script.render = __render
      __script.__hmrId = "${url}"
      __script.__file = "${filePath}"
      export default __script`);
      ctx.status = 200;
      ctx.type = "application/javascript";
      ctx.body = newContent;
    } else if (query.type === "template") {
      ctx.status = 200;
      ctx.type = "application/javascript";
      ctx.body = compilerDOM.parse(descriptor.template.content);
    }
  }
});

app.listen(3001, () => console.log(`server running at http://localhost:3001`));
