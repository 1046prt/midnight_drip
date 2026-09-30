<script setup>
import { computed } from 'vue'
import { useCartStore, useUIStore } from '@/stores'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Loader2 } from '@lucide/vue'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const ui = useUIStore()
const router = useRouter()

const subtotal = computed(() => cart.items.reduce((sum, i) => sum + i.price * i.qty, 0))
const shipping = computed(() => subtotal.value >= 500 ? 0 : 50)
const tax = computed(() => Math.round(subtotal.value * 0.18))
const grandTotal = computed(() => subtotal.value + shipping.value + tax.value)
const freeShippingProgress = computed(() => Math.min(100, (subtotal.value / 500) * 100))
const remainingForFreeShipping = computed(() => Math.max(0, 500 - subtotal.value))

function updateQty(item, delta) {
  cart.updateQty(item.id, item.qty + delta)
}

function removeItem(id) {
  cart.remove(id)
  ui.showToast('Item removed from cart', 'info')
}

async function checkout() {
  if (cart.items.length === 0) return
  ui.showToast('Processing your order...', 'loading', 2000)
  await new Promise(r => setTimeout(r, 2000))
  cart.clear()
  ui.showToast('Order placed successfully!', 'success')
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen pt-20">
    <div class="container mx-auto px-6 md:px-12 py-8 md:py-12">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <button @click="router.back()" class="p-2 rounded-xl text-fg-muted hover:text-fg hover:bg-accent-dim transition-all" aria-label="Go back">
          <ArrowLeft class="w-6 h-6" />
        </button>
        <h1 class="heading-lg">Your Cart</h1>
        <span v-if="cart.count > 0" class="badge">{{ cart.count }} item{{ cart.count !== 1 ? 's' : '' }}</span>
      </div>

      <!-- Empty State -->
      <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="w-24 h-24 rounded-full bg-accent-dim flex items-center justify-center mb-6">
          <ShoppingBag class="w-12 h-12 text-accent" />
        </div>
        <h2 class="heading-md mb-2">Your cart is empty</h2>
        <p class="text-fg-muted mb-8 max-w-md">Looks like you haven't added any coffee yet. Let's fix that!</p>
        <router-link to="/" class="btn gap-2">
          Start Shopping <ArrowRight class="w-5 h-5" />
        </router-link>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <TransitionGroup name="cart-item" tag="div" class="space-y-4">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="cart-item flex gap-4 p-4 bg-bg-card border border-border rounded-xl transition-all duration-200 hover:border-accent-dim"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                loading="lazy"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3 class="font-medium text-fg">{{ item.name }}</h3>
                    <p class="text-sm text-fg-muted">₹{{ item.price }} each</p>
                  </div>
                  <button
                    @click="removeItem(item.id)"
                    class="p-2 rounded-lg text-fg-muted/50 hover:text-error hover:bg-error/10 transition-all"
                    aria-label="Remove item"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <div class="flex items-center gap-2 bg-bg-elevated border border-border rounded-lg p-1">
                    <button
                      @click="updateQty(item, -1)"
                      :disabled="item.qty <= 1"
                      class="p-1.5 rounded-md text-fg-muted hover:text-fg hover:bg-accent-dim disabled:opacity-40 disabled:pointer-events-none transition-all"
                      aria-label="Decrease quantity"
                    >
                      <Minus class="w-4 h-4" />
                    </button>
                    <span class="w-10 text-center font-medium">{{ item.qty }}</span>
                    <button
                      @click="updateQty(item, 1)"
                      class="p-1.5 rounded-md text-fg-muted hover:text-fg hover:bg-accent-dim transition-all"
                      aria-label="Increase quantity"
                    >
                      <Plus class="w-4 h-4" />
                    </button>
                  </div>
                  <span class="font-semibold text-lg text-fg">₹{{ (item.price * item.qty).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 p-6 bg-bg-card border border-border rounded-2xl">
            <h2 class="heading-md mb-6">Order Summary</h2>

            <!-- Free shipping progress -->
            <div v-if="remainingForFreeShipping > 0" class="mb-6 p-4 bg-accent-dim/30 rounded-xl border border-accent/20">
              <p class="text-sm text-fg mb-2">
                Add <span class="font-semibold text-accent">₹{{ remainingForFreeShipping }}</span> more for free shipping!
              </p>
              <div class="h-2 bg-bg-elevated rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full transition-all duration-500"
                  :style="{ width: freeShippingProgress + '%' }"
                />
              </div>
            </div>
            <div v-else class="mb-6 p-4 bg-success/10 rounded-xl border border-success/20">
              <p class="text-sm text-success font-medium">You've unlocked free shipping!</p>
            </div>

            <div class="space-y-3 text-sm mb-6">
              <div class="flex justify-between">
                <span class="text-fg-muted">Subtotal</span>
                <span class="text-fg">₹{{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-fg-muted">Shipping</span>
                <span class="text-fg">{{ shipping === 0 ? 'Free' : '₹' + shipping }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-fg-muted">Tax (18%)</span>
                <span class="text-fg">₹{{ tax }}</span>
              </div>
              <div class="flex justify-between border-t border-border pt-3">
                <span class="font-medium text-fg">Total</span>
                <span class="font-bold text-xl text-fg">₹{{ grandTotal.toFixed(2) }}</span>
              </div>
            </div>

            <button @click="checkout" class="btn w-full py-4 text-lg gap-3">
              <span>Proceed to Checkout</span>
              <ArrowRight class="w-5 h-5" />
            </button>

            <p class="text-xs text-center text-fg-muted/60 mt-4">
              Secure checkout · 100% encrypted · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active { transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.cart-item-enter-from { opacity: 0; transform: translateX(-20px); }
.cart-item-leave-to { opacity: 0; transform: translateX(20px); }
.cart-item-move { transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
</style>