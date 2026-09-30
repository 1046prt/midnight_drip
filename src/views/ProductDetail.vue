<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore, useUIStore } from '@/stores'
import { getProductById, products } from '@/data/products'
import { ArrowLeft, Plus, Minus, ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const ui = useUIStore()

const quantity = ref(1)
const isFavorited = ref(false)
const activeTab = ref('description')

const product = computed(() => getProductById(route.params.id))

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0, 4)
})

const reviews = computed(() => {
  if (!product.value) return []
  return [
    { id: 1, author: 'Priya S.', rating: 5, text: 'Absolutely divine! The flavor profile is incredible.', date: '2 days ago' },
    { id: 2, author: 'Rahul M.', rating: 4, text: 'Great quality, will order again.', date: '1 week ago' },
    { id: 3, author: 'Ananya P.', rating: 5, text: 'Best coffee I have had in Jaipur!', date: '2 weeks ago' }
  ]
})

function addToCart() {
  if (!product.value) return
  cart.add(product.value, quantity.value)
  ui.showToast(`${quantity.value} × ${product.value.name} added to cart!`, 'success')
}

function toggleFavorite() {
  isFavorited.value = !isFavorited.value
  ui.showToast(isFavorited.value ? 'Added to favorites' : 'Removed from favorites', 'info')
}

function shareProduct() {
  if (navigator.share) {
    navigator.share({ title: product.value.name, text: product.value.description, url: window.location.href })
  } else {
    navigator.clipboard.writeText(window.location.href)
    ui.showToast('Link copied to clipboard!', 'success')
  }
}

function goBack() {
  router.back()
}

watch(() => route.params.id, () => {
  quantity.value = 1
  isFavorited.value = false
  activeTab.value = 'description'
})
</script>

<template>
  <div class="min-h-screen pt-20">
    <div v-if="product" class="container mx-auto px-6 md:px-12 py-8 md:py-12">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-fg-muted mb-8" aria-label="Breadcrumb">
        <button @click="goBack" class="flex items-center gap-1 hover:text-accent transition-colors">
          <ArrowLeft class="w-4 h-4" /> Back
        </button>
        <span>/</span>
        <router-link to="/" class="hover:text-accent transition-colors">Products</router-link>
        <span>/</span>
        <span class="text-fg">{{ product.name }}</span>
      </nav>

      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Image -->
        <div class="relative group">
          <div class="aspect-square rounded-2xl overflow-hidden bg-bg-elevated border border-border">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <button
            @click="toggleFavorite"
            :class="[
              'absolute top-4 right-4 p-3 rounded-full transition-all duration-200',
              isFavorited ? 'bg-error text-white' : 'bg-bg-elevated/80 text-fg hover:bg-accent-dim'
            ]"
            :aria-label="isFavorited ? 'Remove from favorites' : 'Add to favorites'"
          >
            <Heart class="w-5 h-5" :fill="isFavorited ? 'currentColor' : 'none'" />
          </button>
        </div>

        <!-- Details -->
        <div class="flex flex-col">
          <div class="flex items-center gap-3 mb-4">
            <span class="badge">{{ product.category }}</span>
            <div class="flex items-center gap-1">
              <Star v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= 4 ? 'text-accent' : 'text-border'" :fill="i <= 4 ? 'currentColor' : 'none'" />
              <span class="text-sm text-fg-muted ml-1">(4.0)</span>
            </div>
          </div>

          <h1 class="heading-lg mb-4">{{ product.name }}</h1>
          <p class="text-fg-muted text-lg mb-8">{{ product.description }}</p>

          <div class="flex items-baseline gap-4 mb-8">
            <span class="text-4xl font-bold text-accent">₹{{ product.price }}</span>
            <span class="text-fg-muted line-through">₹{{ Math.round(product.price * 1.2) }}</span>
            <span class="badge bg-success/20 text-success">20% OFF</span>
          </div>

          <!-- Quantity -->
          <div class="flex items-center gap-4 mb-8">
            <span class="text-fg-muted">Quantity:</span>
            <div class="flex items-center gap-3 bg-bg-elevated border border-border rounded-xl p-1">
              <button
                @click="quantity = Math.max(1, quantity - 1)"
                class="p-2 rounded-lg text-fg-muted hover:text-fg hover:bg-accent-dim transition-all"
                aria-label="Decrease quantity"
              >
                <Minus class="w-5 h-5" />
              </button>
              <span class="w-12 text-center font-semibold text-lg">{{ quantity }}</span>
              <button
                @click="quantity++"
                class="p-2 rounded-lg text-fg-muted hover:text-fg hover:bg-accent-dim transition-all"
                aria-label="Increase quantity"
              >
                <Plus class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <button @click="addToCart" class="btn flex-1 py-4 text-lg gap-3">
              <ShoppingCart class="w-5 h-5" />
              Add to Cart
            </button>
            <button @click="shareProduct" class="btn-ghost btn px-6 py-4">
              <Share2 class="w-5 h-5" />
            </button>
          </div>

          <!-- Trust badges -->
          <div class="grid grid-cols-3 gap-4 p-4 bg-bg-elevated/50 rounded-xl border border-border/50">
            <div class="flex flex-col items-center text-center gap-2">
              <Truck class="w-6 h-6 text-accent" />
              <span class="text-xs text-fg-muted">Free shipping over ₹500</span>
            </div>
            <div class="flex flex-col items-center text-center gap-2">
              <Shield class="w-6 h-6 text-accent" />
              <span class="text-xs text-fg-muted">Secure payment</span>
            </div>
            <div class="flex flex-col items-center text-center gap-2">
              <RotateCcw class="w-6 h-6 text-accent" />
              <span class="text-xs text-fg-muted">Easy returns</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mt-16">
        <div class="flex gap-1 border-b border-border">
          <button
            v-for="tab in ['description', 'reviews', 'shipping']"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-6 py-3 text-sm font-medium capitalize transition-all duration-200 border-b-2 -mb-px',
              activeTab === tab ? 'text-accent border-accent' : 'text-fg-muted border-transparent hover:text-fg'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <div class="py-8">
          <div v-if="activeTab === 'description'" class="prose prose-invert max-w-none">
            <p class="text-fg-muted leading-relaxed">{{ product.description }}</p>
            <p class="text-fg-muted leading-relaxed mt-4">
              Our {{ product.name }} is crafted with precision and care. Each cup is prepared using
              premium beans sourced from the finest estates, roasted to perfection to bring out the
              unique flavor notes that define this exceptional brew.
            </p>
          </div>

          <div v-else-if="activeTab === 'reviews'" class="space-y-6">
            <div v-for="review in reviews" :key="review.id" class="p-6 bg-bg-elevated/50 rounded-xl border border-border/50">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-accent-dim flex items-center justify-center text-accent font-semibold">
                    {{ review.author[0] }}
                  </div>
                  <div>
                    <p class="font-medium text-fg">{{ review.author }}</p>
                    <p class="text-xs text-fg-muted">{{ review.date }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                  <Star v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'text-accent' : 'text-border'" :fill="i <= review.rating ? 'currentColor' : 'none'" />
                </div>
              </div>
              <p class="text-fg-muted">{{ review.text }}</p>
            </div>
          </div>

          <div v-else class="text-fg-muted">
            <p>We offer free shipping on all orders over ₹500. Orders are processed within 24 hours and delivered within 3-5 business days.</p>
            <p class="mt-4">For any shipping-related queries, please contact us at info@midnightdrip.com</p>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0" class="mt-16">
        <h2 class="heading-md mb-8">You Might Also Like</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <router-link
            v-for="p in relatedProducts"
            :key="p.id"
            :to="`/product/${p.id}`"
            class="card group"
          >
            <div class="aspect-square overflow-hidden">
              <img :src="p.image" :alt="p.name" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            </div>
            <div class="p-4">
              <h3 class="font-medium text-fg group-hover:text-accent transition-colors">{{ p.name }}</h3>
              <p class="text-accent font-semibold mt-1">₹{{ p.price }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="container mx-auto px-6 py-32 text-center">
      <h1 class="heading-lg mb-4">Product Not Found</h1>
      <p class="text-fg-muted mb-8">The product you are looking for does not exist.</p>
      <router-link to="/" class="btn">Back to Products</router-link>
    </div>
  </div>
</template>