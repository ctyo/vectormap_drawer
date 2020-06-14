import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import VueAnalytics from 'vue-analytics'

Vue.use(Router)
Vue.use(VueAnalytics, {
  id: 'UA-11027566-8'
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    }
  ]
})
