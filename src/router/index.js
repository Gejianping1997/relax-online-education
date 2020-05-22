import Vue from 'vue'
import Router from 'vue-router'
import SystemManagementCenter from '../modules/SystemManagementCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/SystemManagementCenter',
      name: 'SystemManagementCenter',
      component: SystemManagementCenter
    }
  ]
})
