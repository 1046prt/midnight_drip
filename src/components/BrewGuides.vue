<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Clock, Bean, Droplets, ArrowRight } from '@lucide/vue'
import { px } from '@/data/images'

const router = useRouter()
const isVisible = ref(false)
const sectionRef = ref(null)

const guides = [
  {
    id: 'espresso',
    name: 'Espresso',
    tagline: 'Intense, syrupy, golden crema',
    image: px(9501559, 800, 600),
    ratio: '1:2',
    grind: 'Fine',
    time: '25–30 sec',
    steps: ['Dose 18g of freshly ground coffee', 'Tamp level with firm pressure', 'Pull 36g of liquid espresso']
  },
  {
    id: 'pour-over',
    name: 'Pour Over',
    tagline: 'Clean, bright, tea-like clarity',
    image: px(459489, 800, 600),
    ratio: '1:16',
    grind: 'Medium-fine',
    time: '3–4 min',
    steps: ['Rinse filter, add 22g of coffee', 'Bloom with 50g water for 45 sec', 'Pour slow spirals up to 350g total']
  },
  {
    id: 'french-press',
    name: 'French Press',
    tagline: 'Full-bodied, rich, forgiving',
    image: px(12537507, 800, 600),
    ratio: '1:12',
    grind: 'Coarse',
    time: '4 min',
    steps: ['Add 30g coarse coffee to press', 'Pour 360g hot water, stir gently', 'Steep 4 min, then plunge slowly']
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    tagline: 'Smooth, sweet, low acidity',
    image: px(13735958, 800, 600),
    ratio: '1:8',
    grind: 'Extra coarse',
    time: '12–24 hrs',
    steps: ['Combine 125g coffee with 1L water', 'Steep covered at room temp overnight', 'Strain twice, serve over ice']
  }
]

function shopBeans() {
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

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { isVisible.value = true; observer.disconnect() } },
    { threshold: 0.1 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <section id="brew" ref="sectionRef" class="section relative overflow-hidden">
    <div class="absolute top-1/3 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

    <div class="container mx-auto relative z-10">
      <div class="text-center mb-12">
        <span class="badge mb-4">Brew Guides</span>
        <h2 class="heading-lg mb-4">Brew It Your Way</h2>
        <p class="text-fg-muted text-lg max-w-2xl mx-auto">
          Café quality at home. Pick a method, follow the ratio, and taste the difference fresh beans make.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <article
          v-for="(guide, index) in guides"
          :key="guide.id"
          :class="[
            'card group flex flex-col transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          ]"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <div class="relative h-44 overflow-hidden">
            <img
              :src="guide.image"
              :alt="guide.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
            <h3 class="absolute bottom-3 left-4 heading-md !text-2xl">{{ guide.name }}</h3>
          </div>

          <div class="p-5 flex flex-col flex-1">
            <p class="text-sm text-accent font-medium mb-4">{{ guide.tagline }}</p>

            <div class="grid grid-cols-3 gap-2 mb-4 text-center">
              <div class="p-2 bg-bg-elevated rounded-lg">
                <Droplets class="w-4 h-4 text-accent mx-auto mb-1" />
                <p class="text-xs font-semibold text-fg">{{ guide.ratio }}</p>
                <p class="text-[10px] text-fg-muted">Ratio</p>
              </div>
              <div class="p-2 bg-bg-elevated rounded-lg">
                <Bean class="w-4 h-4 text-accent mx-auto mb-1" />
                <p class="text-xs font-semibold text-fg">{{ guide.grind }}</p>
                <p class="text-[10px] text-fg-muted">Grind</p>
              </div>
              <div class="p-2 bg-bg-elevated rounded-lg">
                <Clock class="w-4 h-4 text-accent mx-auto mb-1" />
                <p class="text-xs font-semibold text-fg">{{ guide.time }}</p>
                <p class="text-[10px] text-fg-muted">Time</p>
              </div>
            </div>

            <ol class="space-y-2 text-sm text-fg-muted flex-1">
              <li v-for="(step, i) in guide.steps" :key="i" class="flex gap-2">
                <span class="text-accent font-semibold flex-shrink-0">{{ i + 1 }}.</span>
                <span>{{ step }}</span>
              </li>
            </ol>
          </div>
        </article>
      </div>

      <div class="text-center mt-10">
        <button @click="shopBeans" class="btn gap-2">
          Shop Fresh Beans <ArrowRight class="w-5 h-5" />
        </button>
      </div>
    </div>
  </section>
</template>