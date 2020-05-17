import { createApp } from 'vue'
import App from './app.vue'
import {bb} from './treeShaking'
console.log(bb)
createApp(App).mount('#root')