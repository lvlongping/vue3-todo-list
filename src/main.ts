import { createApp } from 'vue'
import App from './App.vue'
import "./assets/style/reset.less";
import Router from './router/index'
import { setupAntd, setupCustomComponents } from './plugins';
const app = createApp(App);
app.use(Router)
setupAntd(app);
// 全局注册svg组件
setupCustomComponents(app);
app.mount('#app')
