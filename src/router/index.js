import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pail from '@/components/pail/Pail'
import User from '@/components/user/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/pail',
    },
    {
    	path: '/pail',
    	name: 'Pail',
    	component: Pail
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
