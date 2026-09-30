<script setup>
import { useRouter } from 'vue-router'
import { MapPin, Clock, Phone, ArrowRight } from '@lucide/vue'
import { px } from '@/data/images'

const router = useRouter()

const hours = [
  { day: 'Monday – Friday', time: '6:00 AM – 12:00 AM' },
  { day: 'Saturday – Sunday', time: '7:00 AM – 1:00 AM' }
]

function orderPickup() {
  router.push('/').then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = document.getElementById('products')
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }))
  })
}
</script>

<template>
  <section id="visit" class="section relative overflow-hidden">
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

    <div class="container mx-auto relative z-10">
      <div class="grid lg:grid-cols-2 gap-8 items-stretch">
        <!-- Image -->
        <div class="relative rounded-2xl overflow-hidden shadow-elevated min-h-72">
          <img
            :src="px(5373256, 1200, 900)"
            alt="Inside the Midnight Drip café"
            class="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
          <div class="absolute bottom-5 left-5 right-5 flex items-center gap-3">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span class="relative inline-flex rounded-full h-3 w-3 bg-success" />
            </span>
            <p class="text-sm font-medium text-fg">Open now — brewing till midnight</p>
          </div>
        </div>

        <!-- Info -->
        <div class="p-8 md:p-10 bg-bg-card border border-border rounded-2xl flex flex-col">
          <span class="badge mb-4 self-start">Visit Us</span>
          <h2 class="heading-md mb-6">Come Say Hi Over a Cup</h2>

          <ul class="space-y-4 mb-8">
            <li class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span class="text-fg-muted">123 Coffee Street, Jaipur, Rajasthan 302001</span>
            </li>
            <li class="flex items-start gap-3">
              <Phone class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span class="text-fg-muted">+91 9508015377</span>
            </li>
            <li class="flex items-start gap-3">
              <Clock class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div class="text-fg-muted">
                <p v-for="h in hours" :key="h.day" class="flex justify-between gap-8">
                  <span>{{ h.day }}</span>
                  <span class="text-fg">{{ h.time }}</span>
                </p>
              </div>
            </li>
          </ul>

          <div class="flex flex-col sm:flex-row gap-3 mt-auto">
            <button @click="orderPickup" class="btn flex-1 gap-2">
              Order for Pickup <ArrowRight class="w-5 h-5" />
            </button>
            <a href="tel:+919508015377" class="btn-ghost btn flex-1">
              Call the Store
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>