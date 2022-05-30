import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import i18n from './i18n'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_DATA_SERVICE_URL;

loadFonts()

createApp(App).use(i18n).use(i18n)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
