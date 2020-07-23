import { add } from "./a.js";
import { minus } from "./b.js";
import { createApp } from "vue";
// import App from "./App.vue";

console.log("1 + 1: ", add(1, 1));
console.log("2 - 1: ", minus(2, 1));
console.log("vue createApp: ", createApp);
// createApp(App).mount("#root");
