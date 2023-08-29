import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import VueAxios from 'vue-axios'

const pinia = createPinia()

loadFonts()

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount('#app')
