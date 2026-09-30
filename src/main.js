import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { MotionPlugin } from '@vueuse/motion'
import Lenis from 'lenis'

import App from './App.vue'
import Home from './views/Home.vue'
import ProductDetail from './views/ProductDetail.vue'
import Cart from './views/Cart.vue'
import NotFound from './views/NotFound.vue'

import './styles/main.css'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to) => {
    if (to.hash) return { el: to.hash, top: 84, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { transition: 'slide-fade' } },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, meta: { transition: 'scale-fade' } },
    { path: '/cart', name: 'Cart', component: Cart, meta: { transition: 'slide-fade' } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(MotionPlugin)

let lenis = null

router.isReady().then(() => {
  app.mount('#app')

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothTouch: false,
      touchMultiplier: 2
    })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
      window.dispatchEvent(new CustomEvent('lenis-scroll', { detail: { scroll, limit, velocity, direction, progress } }))
    })
  }
})

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => { lenis?.destroy() })
}