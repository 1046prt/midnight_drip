<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '@/composables/useScroll'
import aboutImg from '@/assets/images.json'

const reducedMotion = useReducedMotion()
const isVisible = ref(false)
const sectionRef = ref(null)

const stats = [
  { value: '50+', label: 'Coffee Varieties', suffix: '' },
  { value: '1000+', label: 'Happy Customers', suffix: '' },
  { value: '24/7', label: 'Available Online', suffix: '' }
]

const values = [
  { title: 'Quality First', desc: 'We source only the finest beans from around the world.' },
  { title: 'Craftsmanship', desc: 'Every cup is prepared with precision and care.' },
  { title: 'Community', desc: 'Building connections over great coffee since 2020.' }
]

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) isVisible.value = true },
    { threshold: 0.2 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <section id="about" ref="sectionRef" class="section relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />

    <div class="container mx-auto relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Image -->
        <div :class="['relative transition-all duration-700', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10']">
          <div class="relative rounded-2xl overflow-hidden shadow-elevated">
            <img
              :src="aboutImg.about.url"
              alt="Coffee beans"
              class="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
          </div>

          <!-- Experience badge -->
          <div class="absolute -bottom-6 -right-6 p-6 bg-bg-card border border-border rounded-xl shadow-elevated">
            <p class="text-4xl font-bold text-accent">4+</p>
            <p class="text-sm text-fg-muted">Years of Excellence</p>
          </div>
        </div>

        <!-- Content -->
        <div :class="['transition-all duration-700 delay-200', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10']">
          <span class="badge mb-4">Our Story</span>
          <h2 class="heading-lg mb-6">Crafting the Perfect Cup Since 2020</h2>
          <p class="text-fg-muted text-lg leading-relaxed mb-6">
            Founded in 2020, Midnight Drip began as a small coffee cart serving late-night workers
            and early risers in Jaipur. Our passion for perfecting the coffee experience has grown
            into a thriving business that sources the finest beans from around the world.
          </p>
          <p class="text-fg-muted text-lg leading-relaxed mb-8">
            We roast our beans in small batches to ensure maximum freshness and flavor. Our expert
            baristas are trained to bring out the best in every cup, whether it's a simple espresso
            or a complex specialty drink.
          </p>

          <!-- Values -->
          <div class="space-y-4 mb-8">
            <div v-for="value in values" :key="value.title" class="flex items-start gap-4">
              <div class="w-2 h-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-fg">{{ value.title }}</h3>
                <p class="text-fg-muted text-sm">{{ value.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="text-center p-4 bg-bg-elevated/50 rounded-xl border border-border/50">
              <p class="text-2xl md:text-3xl font-bold text-accent">{{ stat.value }}</p>
              <p class="text-sm text-fg-muted">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>