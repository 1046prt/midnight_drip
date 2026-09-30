<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useUIStore } from '@/stores'
import { useRouter } from 'vue-router'
import { products, getProductsByCategory } from '@/data/products'
import { Search, X, ChevronRight, Coffee, Snowflake, Sparkles } from '@lucide/vue'

const ui = useUIStore()
const router = useRouter()
const inputRef = ref(null)
const selectedIndex = ref(0)

const filteredProducts = computed(() => {
  let base = getProductsByCategory(ui.activeFilter)
  if (ui.searchQuery.trim()) {
    const q = ui.searchQuery.toLowerCase().trim()
    base = base.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }
  return base
})

const filterIcons = { all: Coffee, espresso: Coffee, cold: Snowflake, specialty: Sparkles }

function selectProduct(product) {
  router.push(`/product/${product.id}`)
  ui.closeSearch()
}

function handleKeydown(e) {
  const items = filteredProducts.value
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, items.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  } else if (e.key === 'Enter' && items[selectedIndex.value]) {
    e.preventDefault()
    selectProduct(items[selectedIndex.value])
  } else if (e.key === 'Escape') {
    ui.closeSearch()
  }
}

watch(() => ui.isSearchOpen, async (open) => {
  if (open) {
    await nextTick()
    inputRef.value?.focus()
    selectedIndex.value = 0
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
<Teleport to="body">
  <div
    v-if="ui.isSearchOpen"
    class="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32"
    @click="ui.closeSearch"
    role="dialog"
    aria-modal="true"
    aria-label="Search products"
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
      aria-hidden="true"
    />

    <!-- Search Panel -->
    <div
      class="relative w-full max-w-2xl mx-4 bg-bg-card border border-border rounded-2xl shadow-elevated overflow-hidden animate-scale-in"
      @click.stop
    >
      <!-- Input -->
      <div class="relative p-4 md:p-6 border-b border-border">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fg-muted/60" />
          <input
            ref="inputRef"
            v-model="ui.searchQuery"
            type="search"
            placeholder="Search coffee... (try 'cold', 'espresso', 'latte')"
            class="w-full pl-12 pr-12 py-4 bg-bg-elevated border border-border rounded-xl text-fg placeholder-fg-muted/50 text-base focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
            aria-label="Search products"
            autocomplete="off"
            @keydown.esc="ui.closeSearch"
          />
          <button
            v-if="ui.searchQuery"
            @click="ui.searchQuery = ''"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-fg-muted hover:text-fg hover:bg-accent-dim transition-colors"
            aria-label="Clear search"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Filter chips -->
        <div class="flex flex-wrap gap-2 mt-4" role="group" aria-label="Filter by category">
          <button
            v-for="f in ui.filters"
            :key="f"
            @click="ui.setFilter(f)"
            :class="[
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
              ui.activeFilter === f
                ? 'bg-accent text-bg shadow-glow'
                : 'bg-bg-elevated text-fg-muted hover:text-fg hover:bg-accent-dim hover:border-accent border border-border'
            ]"
            :aria-pressed="ui.activeFilter === f"
          >
            <component :is="filterIcons[f]" class="w-4 h-4" />
            {{ f.charAt(0).toUpperCase() + f.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Results -->
      <div class="max-h-[50vh] overflow-y-auto p-4 md:p-6">
        <div v-if="filteredProducts.length === 0" class="text-center py-12 text-fg-muted">
          <Coffee class="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p class="text-lg font-medium text-fg">No results found</p>
          <p class="text-sm mt-1">Try adjusting your search or filter</p>
        </div>

        <ul v-else class="space-y-2" role="listbox" aria-label="Search results">
          <li
            v-for="(product, index) in filteredProducts"
            :key="product.id"
            :class="[
              'relative flex items-center gap-4 p-3 rounded-xl transition-all duration-150 cursor-pointer group',
              index === selectedIndex ? 'bg-accent-dim outline outline-1 outline-accent' : 'hover:bg-accent-dim/50'
            ]"
            role="option"
            :aria-selected="index === selectedIndex"
            @click="selectProduct(product)"
            @mouseenter="selectedIndex = index"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-14 h-14 rounded-lg object-cover flex-shrink-0 shadow-sm"
              loading="lazy"
            />
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-fg truncate">{{ product.name }}</h4>
              <p class="text-sm text-fg-muted truncate">{{ product.description }}</p>
            </div>
            <div class="flex items-center gap-3 text-fg-muted">
              <span class="font-semibold text-fg whitespace-nowrap">₹{{ product.price }}</span>
              <ChevronRight class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </li>
        </ul>

        <div v-if="filteredProducts.length > 0" class="mt-4 pt-4 border-t border-border text-center text-sm text-fg-muted">
          {{ filteredProducts.length }} result{{ filteredProducts.length !== 1 ? 's' : '' }} found
        </div>
      </div>
    </div>
  </div>
</Teleport>
</template>

<style scoped>
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-scale-in { animation: scaleIn 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
</style>