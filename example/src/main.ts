import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// @ts-ignore
import { logInfo } from "@monorepo/package-c"
logInfo()
// @ts-ignore
import { logInfo as logInfo1, sum } from '@monorepo/package-a'

logInfo1()
console.log(sum(1,2))

createApp(App).mount('#app')
