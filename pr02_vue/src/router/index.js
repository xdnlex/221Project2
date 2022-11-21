import Vue from 'vue'
import VueRouter from 'vue-router'
import Pr02View from '../views/Pr02View.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pr02',
    component: Pr02View
  }
]

const router = new VueRouter({
  routes
})

export default router
