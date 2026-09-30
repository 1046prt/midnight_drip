<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUIStore } from '@/stores'
import { categories, getProductsByCategory } from '@/data/products'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ProductsSection from '@/components/ProductsSection.vue'
import BrewGuides from '@/components/BrewGuides.vue'
import Gallery from '@/components/Gallery.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import Faq from '@/components/Faq.vue'
import VisitUs from '@/components/VisitUs.vue'
import Footer from '@/components/Footer.vue'

const ui = useUIStore()
const activeCategory = ref('all')
const searchQuery = ref('')
const sortBy = ref('default')

const filteredProducts = computed(() => {
  let result = getProductsByCategory(activeCategory.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }
  if (sortBy.value === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
  if (sortBy.value === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  return result
})

function setCategory(cat) {
  activeCategory.value = cat
}

function handleSearch(value) {
  searchQuery.value = value
}

onMounted(() => {
  ui.init()
})
</script>

<template>
  <div class="min-h-screen">
    <HeroSection />
    <AboutSection />
    <ProductsSection
      :products="filteredProducts"
      :categories="categories"
      :active-category="activeCategory"
      :search-query="searchQuery"
      :sort-by="sortBy"
      @update:category="setCategory"
      @update:search="handleSearch"
      @update:sort="sortBy = $event"
    />
    <BrewGuides />
    <Gallery />
    <TestimonialsSection />
    <Faq />
    <VisitUs />
    <Footer />
  </div>
</template>