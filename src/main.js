import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 一定要按照这个格式写 不然会报奇奇怪怪的错误！！！

const app = createApp();
// createApp(App);
// app.use(router);
// app.mount('#app');
createApp(App).use(router).mount('#app')

// Vue(App).$mount('#app')
// new Vue({ render: h => h(App) }).$mount('#app')
// createApp(App).mount('#app')