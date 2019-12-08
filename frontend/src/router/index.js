import Vue from 'vue'
import VueRouter from 'vue-router'
import Boulderers from '../views/Boulderers.vue'
import BuddySearches from '../views/BuddySearches.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/boulderers',
    name: 'boulderers',
    component: Boulderers
  },
  {
    path: '/buddy-searches',
    name: 'buddySearches',
    component: BuddySearches
  },
  {
    path: '/',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
