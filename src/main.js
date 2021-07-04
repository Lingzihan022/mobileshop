
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 一定要按照这个格式写 不然会报奇奇怪怪的错误！！！



// app.mount('#app');
createApp(App).use(store).use(router).mount('#app');

// use(store).
// Vue(App).$mount('#app')
// new Vue({ render: h => h(App) }).$mount('#app')
// createApp(App).mount('#app')
