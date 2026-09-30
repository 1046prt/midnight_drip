import { ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

export function useLenis() {
  const lenis = ref(null)

  onMounted(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis.value = new Lenis({ duration: 1.2, easing: t => 1 - Math.pow(1 - t, 3), smoothTouch: false })
      function raf(time) { lenis.value.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }
  })

  onUnmounted(() => { lenis.value?.destroy() })

  return lenis
}

export function useScrollSpy(targets, options = {}) {
  const { threshold = 0.15, rootMargin = '-20% 0px -70% 0px' } = options
  const active = ref(null)
  const observer = ref(null)

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) active.value = entry.target.dataset.section
      })
    }, { threshold, rootMargin })
    targets.value?.forEach(el => el && observer.value.observe(el))
  })

  onUnmounted(() => observer.value?.disconnect())

  return active
}

export function useParallax(speed = 0.3) {
  const transform = ref('translateY(0)')
  const cleanup = ref(null)

  onMounted(() => {
    const handler = ({ detail }) => {
      transform.value = `translateY(${detail.scroll * speed}px)`
    }
    window.addEventListener('lenis-scroll', handler)
    cleanup.value = () => window.removeEventListener('lenis-scroll', handler)
  })

  onUnmounted(() => cleanup.value?.())

  return transform
}

export function useReducedMotion() {
  const prefersReduced = ref(false)
  onMounted(() => {
    prefersReduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  return prefersReduced
}