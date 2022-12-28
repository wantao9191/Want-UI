import { createApp } from 'vue'
import './style.scss'
import './transtion.scss'
import { App } from './App'
import install from './libs'
const app = createApp(App)
app.use(install)
app.mount('#app')
