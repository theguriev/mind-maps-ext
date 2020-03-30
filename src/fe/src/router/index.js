import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Editor from '../views/Editor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/map/:id',
    name: 'Map',
    component: Editor
  }
]

const router = new VueRouter({
  routes
})

export default router
