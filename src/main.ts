import { createApp } from 'vue'
import { pinia } from '@/stores/index'

//全局样式
import './assets/main.scss'
//根组件
import App from './App.vue'
//路由文件
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
