import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/lib/theme-chalk/index.css'
import { store } from './store/store';

createApp(App).use(store).use(router).mount('#app')
