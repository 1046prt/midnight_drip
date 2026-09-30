<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Star, Quote } from '@lucide/vue'

const isVisible = ref(false)
const sectionRef = ref(null)
const activeIndex = ref(0)

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Regular Customer',
    avatar: 'PS',
    rating: 5,
    text: "The best coffee I've ever had! The flavors are so rich and complex, it's like a different experience every time."
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Night Shift Nurse',
    avatar: 'RM',
    rating: 5,
    text: "As a night shift worker, Midnight Drip has been my savior. Their coffee keeps me going through the long nights."
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Coffee Blogger',
    avatar: 'AP',
    rating: 5,
    text: "I'm a coffee connoisseur and I can confidently say Midnight Drip serves some of the finest brews in the city."
  }
]

function nextTestimonial() {
  activeIndex.value = (activeIndex.value + 1) % testimonials.length
}

function prevTestimonial() {
  activeIndex.value = (activeIndex.value - 1 + testimonials.length) % testimonials.length
}

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
  <section id="testimonials" ref="sectionRef" class="section relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-bg via-bg-elevated/50 to-bg" />

    <div class="container mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-12">
        <span class="badge mb-4">Testimonials</span>
        <h2 class="heading-lg mb-4">What Our Customers Say</h2>
        <p class="text-fg-muted text-lg max-w-2xl mx-auto">
          Don't just take our word for it — hear from our happy customers.
        </p>
      </div>

      <!-- Testimonial Cards -->
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          :class="[
            'p-6 bg-bg-card border border-border rounded-2xl transition-all duration-500 hover:border-accent-dim hover:shadow-card',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          ]"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- Quote icon -->
          <Quote class="w-8 h-8 text-accent/30 mb-4" />

          <!-- Rating -->
          <div class="flex items-center gap-1 mb-4">
            <Star v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= testimonial.rating ? 'text-accent' : 'text-border'" :fill="i <= testimonial.rating ? 'currentColor' : 'none'" />
          </div>

          <!-- Text -->
          <p class="text-fg-muted leading-relaxed mb-6">"{{ testimonial.text }}"</p>

          <!-- Author -->
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-accent-dim flex items-center justify-center text-accent font-semibold">
              {{ testimonial.avatar }}
            </div>
            <div>
              <p class="font-medium text-fg">{{ testimonial.name }}</p>
              <p class="text-sm text-fg-muted">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>