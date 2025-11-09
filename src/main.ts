//全局样式
import './styles/index.scss'
import { createApp } from 'vue'
import { pinia } from '@/stores/index'
import { setupRem } from './utils/rem'

// 优先执行 rem 适配（确保在渲染前生效）
setupRem()
//根组件
import App from './App.vue'
//路由文件
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
