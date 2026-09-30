<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore, useUIStore } from '@/stores'
import { ShoppingCart, Heart, Eye } from '@lucide/vue'

const props = defineProps({
  product: { type: Object, required: true },
  index: { type: Number, default: 0 }
})

const router = useRouter()
const cart = useCartStore()
const ui = useUIStore()

const isFavorited = ref(false)
const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function addToCart(e) {
  e.stopPropagation()
  cart.add(props.product, 1)
  ui.showToast(`${props.product.name} added to cart!`, 'success')
}

function toggleFavorite(e) {
  e.stopPropagation()
  isFavorited.value = !isFavorited.value
  ui.showToast(isFavorited.value ? 'Added to favorites' : 'Removed from favorites', 'info')
}

function viewProduct() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div
    v-motion
    :initial="reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 500, delay: reduceMotion ? 0 : Math.min(index * 50, 400) } }"
    class="card group cursor-pointer"
    @click="viewProduct"
    role="article"
    :aria-label="product.name"
  >
    <!-- Image -->
    <div class="relative aspect-square overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <!-- Quick actions -->
      <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <button
          @click="toggleFavorite"
          :class="[
            'p-2.5 rounded-full transition-all duration-200',
            isFavorited ? 'bg-error text-white' : 'bg-bg-elevated/90 text-fg hover:bg-accent-dim'
          ]"
          :aria-label="isFavorited ? 'Remove from favorites' : 'Add to favorites'"
        >
          <Heart class="w-4 h-4" :fill="isFavorited ? 'currentColor' : 'none'" />
        </button>
        <button
          @click.stop="viewProduct"
          class="p-2.5 rounded-full bg-bg-elevated/90 text-fg hover:bg-accent-dim transition-all duration-200"
          aria-label="Quick view"
        >
          <Eye class="w-4 h-4" />
        </button>
      </div>

      <!-- Category badge -->
      <span class="absolute top-3 left-3 badge text-xs">{{ product.category }}</span>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="font-semibold text-lg text-fg group-hover:text-accent transition-colors mb-1">
        {{ product.name }}
      </h3>
      <p class="text-sm text-fg-muted line-clamp-2 mb-4">{{ product.description }}</p>

      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-accent">₹{{ product.price }}</span>
        <button
          @click="addToCart"
          class="p-2.5 rounded-xl bg-accent-dim text-accent hover:bg-accent hover:text-bg transition-all duration-200"
          aria-label="Add to cart"
        >
          <ShoppingCart class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>