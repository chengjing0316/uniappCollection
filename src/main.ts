import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from 'uview-plus'

import * as Pinia from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/style/index.scss'

export function createApp() {
  const app = createSSRApp(App);
  
  
  const pinia = Pinia.createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(uviewPlus)
  app.use(pinia)
  // uni.$u.config.unit = 'rpx'
  return {
    app,
	Pinia
  }
}
