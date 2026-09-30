<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Play, Star, Truck, Clock, Award } from '@lucide/vue'
import heroImg from '@/assets/images.json'

const router = useRouter()
const mouseX = ref(0)
const mouseY = ref(0)
const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const features = [
  { icon: Star, label: 'Premium Beans', desc: 'Single origin' },
  { icon: Truck, label: 'Free Delivery', desc: 'Orders over ₹500' },
  { icon: Clock, label: '24/7 Support', desc: 'Always here' },
  { icon: Award, label: 'Best Quality', desc: 'Guaranteed' }
]

function handleMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  mouseX.value = ((e.clientX - rect.left) / rect.width - 0.5) * 20
  mouseY.value = ((e.clientY - rect.top) / rect.height - 0.5) * 20
}

function scrollToProducts() {
  const el = document.getElementById('products')
  if (el) {
    const headerHeight = document.querySelector('header')?.offsetHeight || 80
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-28 pb-20"
    @mousemove="handleMouseMove"
  >
    <!-- Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-bg via-bg to-bg-elevated" />
      <div
        class="absolute inset-0 opacity-20"
        :style="{
          backgroundImage: `url(${heroImg.hero.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${mouseX * 0.5}px, ${mouseY * 0.5}px) scale(1.1)`
        }"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
    </div>

    <!-- Floating elements -->
    <div class="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-accent/10 blur-2xl animate-pulse" />
    <div class="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl animate-pulse" style="animation-delay: 1s" />

    <!-- Content -->
    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left: Text -->
        <div
          v-motion
          :initial="reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 700, ease: 'easeOut' } }"
        >
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-dim rounded-full text-accent text-sm font-medium mb-6">
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Premium Coffee Experience
          </div>

          <h1 class="heading-xl mb-6">
            From midnight to sunrise:
            <span class="gradient-text block">one drip at a time.</span>
          </h1>

          <p class="text-fg-muted text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Whether you're greeting the sunrise or burning the midnight oil, our premium brews
            turn every moment into a coffee ritual. Every bean is meticulously roasted to bring
            out its smooth, satisfying character from the first sip to the last drop.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <button @click="scrollToProducts" class="btn py-4 px-8 text-lg gap-3 group">
              Shop Now
              <ArrowRight class="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button class="btn-ghost btn py-4 px-8 text-lg gap-3">
              <Play class="w-5 h-5" />
              Watch Story
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6">
            <div v-for="stat in [
              { value: '50+', label: 'Coffee Varieties' },
              { value: '1000+', label: 'Happy Customers' },
              { value: '24/7', label: 'Available Online' }
            ]" :key="stat.label" class="text-center sm:text-left">
              <p class="text-2xl md:text-3xl font-bold text-accent">{{ stat.value }}</p>
              <p class="text-sm text-fg-muted">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Image -->
        <div
          v-motion
          :initial="reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.96 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: reduceMotion ? 0 : 700, delay: reduceMotion ? 0 : 200, ease: 'easeOut' } }"
        >
          <div class="relative">
            <!-- Main image -->
            <div class="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                :src="heroImg.hero.url"
                alt="Premium Coffee"
                class="w-full aspect-[4/3] object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
            </div>

            <!-- Floating card -->
            <div class="absolute -bottom-6 -left-6 p-4 bg-bg-card border border-border rounded-xl shadow-elevated animate-float">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-accent-dim flex items-center justify-center">
                  <Star class="w-6 h-6 text-accent" fill="currentColor" />
                </div>
                <div>
                  <p class="font-semibold text-fg">4.9/5 Rating</p>
                  <p class="text-sm text-fg-muted">2,000+ reviews</p>
                </div>
              </div>
            </div>

            <!-- Floating badge -->
            <div class="absolute -top-4 -right-4 p-3 bg-accent text-bg rounded-xl shadow-glow animate-float" style="animation-delay: 0.5s">
              <p class="text-sm font-bold">Fresh Roast</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted">
      <span class="text-xs uppercase tracking-widest">Scroll</span>
      <div class="w-6 h-10 rounded-full border-2 border-fg-muted/30 flex items-start justify-center p-1">
        <div class="w-1.5 h-3 rounded-full bg-accent animate-scroll" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float { animation: float 3s ease-in-out infinite; }

@keyframes scroll {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(12px); opacity: 0; }
}
.animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
</style>