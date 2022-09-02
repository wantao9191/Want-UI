import { createApp } from 'vue'
import './style.scss'
import { App } from './App'
import install from './libs'
const app = createApp(App)
app.use(install)
console.log(app)
app.mount('#app')
