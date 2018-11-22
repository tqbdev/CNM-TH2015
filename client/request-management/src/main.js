import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import Vuetify from 'vuetify'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import {sync} from 'vuex-router-sync'

import 'vuetify/dist/vuetify.min.css'
import 'vue-snotify/styles/material.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import store from '@/store/store'

import Panel from '@/components/globals/Panel'

import config from './config';

Vue.config.productionTip = false

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(Vuetify)
Vue.use(Snotify, options)
Vue.component('panel', Panel)

Vue.filter('requestStatus', function (value) {
  if (!value) return ''
  switch (+value) {
    case config.REQUEST.UNLOCATED:
      return 'UNLOCATED'
    case config.REQUEST.LOCATED:
      return 'LOCATED'
    case config.REQUEST.RECEIVED:
      return 'RECEIVED'
    case config.REQUEST.MOVING:
      return 'MOVING'
    case config.REQUEST.COMPLETED:
      return 'COMPLETED'
  }
})

sync(store, router)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
