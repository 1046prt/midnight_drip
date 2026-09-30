<script setup>
import { ref, computed, watch } from 'vue'
import { useUIStore } from '@/stores'
import ProductCard from '@/components/ProductCard.vue'
import { Search, SlidersHorizontal, ChevronDown, X } from '@lucide/vue'

const props = defineProps({
  products: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  activeCategory: { type: String, default: 'all' },
  searchQuery: { type: String, default: '' },
  sortBy: { type: String, default: 'default' }
})

const emit = defineEmits(['update:category', 'update:search', 'update:sort'])

const ui = useUIStore()
const sortOpen = ref(false)

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' }
]

const currentSortLabel = computed(() => {
  return sortOptions.find(o => o.value === props.sortBy)?.label || 'Default'
})

function setCategory(cat) {
  emit('update:category', cat)
}

function handleSearch(e) {
  emit('update:search', e.target.value)
}

function setSort(value) {
  emit('update:sort', value)
  sortOpen.value = false
}

watch(() => props.products, () => {
  // Trigger animation when products change
})
</script>

<template>
  <section id="products" class="section relative">
    <div class="container mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <span class="badge mb-4">Our Menu</span>
        <h2 class="heading-lg mb-4">Signature Coffee Selection</h2>
        <p class="text-fg-muted text-lg max-w-2xl mx-auto">
          Experience the diverse flavors of our specially curated coffee collection.
        </p>
      </div>

      <!-- Filters & Search -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <!-- Category filters -->
        <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="setCategory(cat.id)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeCategory === cat.id
                ? 'bg-accent text-bg shadow-glow'
                : 'bg-bg-elevated text-fg-muted hover:text-fg hover:bg-accent-dim border border-border'
            ]"
            :aria-pressed="activeCategory === cat.id"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Search & Sort -->
        <div class="flex items-center gap-3">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted/60" />
            <input
              :value="searchQuery"
              @input="handleSearch"
              type="search"
              placeholder="Search..."
              class="pl-10 pr-4 py-2.5 bg-bg-elevated border border-border rounded-xl text-sm text-fg placeholder-fg-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all w-48"
              aria-label="Search products"
            />
            <button
              v-if="searchQuery"
              @click="emit('update:search', '')"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-fg-muted hover:text-fg"
              aria-label="Clear search"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Sort dropdown -->
          <div class="relative">
            <button
              @click="sortOpen = !sortOpen"
              class="flex items-center gap-2 px-4 py-2.5 bg-bg-elevated border border-border rounded-xl text-sm text-fg-muted hover:text-fg hover:border-accent-dim transition-all"
              :aria-expanded="sortOpen"
              aria-haspopup="listbox"
            >
              <SlidersHorizontal class="w-4 h-4" />
              <span class="hidden sm:inline">{{ currentSortLabel }}</span>
              <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': sortOpen }" />
            </button>

            <Transition name="dropdown">
              <div
                v-if="sortOpen"
                class="absolute right-0 top-full mt-2 w-48 bg-bg-card border border-border rounded-xl shadow-elevated overflow-hidden z-20"
                role="listbox"
                aria-label="Sort options"
              >
                <button
                  v-for="option in sortOptions"
                  :key="option.value"
                  @click="setSort(option.value)"
                  :class="[
                    'w-full px-4 py-3 text-left text-sm transition-colors',
                    sortBy === option.value ? 'bg-accent-dim text-accent' : 'text-fg-muted hover:bg-accent-dim/50 hover:text-fg'
                  ]"
                  role="option"
                  :aria-selected="sortBy === option.value"
                >
                  {{ option.label }}
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="(product, index) in products"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="w-16 h-16 rounded-full bg-accent-dim flex items-center justify-center mx-auto mb-4">
          <Search class="w-8 h-8 text-accent" />
        </div>
        <h3 class="text-xl font-medium text-fg mb-2">No products found</h3>
        <p class="text-fg-muted">Try adjusting your search or filter</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active { transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.dropdown-enter-from,
.dropdown-leave-to { opacity: 0; transform: translateY(-8px) scale(0.98); }
</style>