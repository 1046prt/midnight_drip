<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLeaving = ref(false)
const currentKey = ref(0)

const transitionName = computed(() => route.meta.transition || 'fade')

function beforeEnter(el) {
  el.style.opacity = 0
  el.style.transform = getEnterTransform()
}

function enter(el, done) {
  requestAnimationFrame(() => {
    el.style.transition = 'opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    el.style.opacity = 1
    el.style.transform = 'none'
    done()
  })
}

function leave(el, done) {
  isLeaving.value = true
  el.style.transition = 'opacity 200ms ease-in, transform 200ms ease-in'
  el.style.opacity = 0
  el.style.transform = getLeaveTransform()
  setTimeout(() => { isLeaving.value = false; done() }, 200)
}

function getEnterTransform() {
  switch (transitionName.value) {
    case 'slide-fade': return 'translateY(20px)'
    case 'scale-fade': return 'scale(0.96)'
    default: return 'translateY(10px)'
  }
}

function getLeaveTransform() {
  switch (transitionName.value) {
    case 'slide-fade': return 'translateY(-10px)'
    case 'scale-fade': return 'scale(0.98)'
    default: return 'translateY(-5px)'
  }
}

watch(() => route.path, () => {
  currentKey.value++
})
</script>

<template>
  <Transition
    :name="transitionName"
    mode="out-in"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div :key="currentKey" class="w-full">
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
/* Fade */
.fade-enter-active,
.fade-leave-active { transition: opacity 300ms ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

/* Slide Fade */
.slide-fade-enter-active,
.slide-fade-leave-active { transition: opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.slide-fade-enter-from { opacity: 0; transform: translateY(20px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-10px); }

/* Scale Fade */
.scale-fade-enter-active,
.scale-fade-leave-active { transition: opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.scale-fade-enter-from { opacity: 0; transform: scale(0.96); }
.scale-fade-leave-to { opacity: 0; transform: scale(0.98); }
</style>