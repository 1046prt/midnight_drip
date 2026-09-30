<script setup>
import { useRouter } from 'vue-router'
import { Home, ArrowLeft, Coffee } from '@lucide/vue'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6">
    <div class="text-center max-w-lg">
      <!-- Animated 404 -->
      <div class="relative mb-8">
        <div class="text-[12rem] md:text-[16rem] font-display font-bold text-accent/10 leading-none select-none">
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-24 h-24 rounded-full bg-accent-dim flex items-center justify-center animate-bounce">
            <Coffee class="w-12 h-12 text-accent" />
          </div>
        </div>
      </div>

      <h1 class="heading-lg mb-4">Page Not Found</h1>
      <p class="text-fg-muted text-lg mb-8">
        Looks like you've wandered off the coffee trail. Let's get you back to the brews you love.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button @click="goHome" class="btn gap-2">
          <Home class="w-5 h-5" /> Back to Home
        </button>
        <button @click="goBack" class="btn-ghost btn gap-2">
          <ArrowLeft class="w-5 h-5" /> Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce { animation: bounce 2s ease-in-out infinite; }
</style>