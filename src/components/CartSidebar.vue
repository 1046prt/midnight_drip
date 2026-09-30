<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores'
import { X, Plus, Minus, Trash2, ArrowRight, Loader2 } from '@lucide/vue'

const cart = useCartStore()
const emit = defineEmits(['close'])
const checkingOut = ref(false)

const subtotal = computed(() => cart.items.reduce((sum, i) => sum + i.price * i.qty, 0))
const shipping = computed(() => subtotal.value >= 500 ? 0 : 50)
const tax = computed(() => Math.round(subtotal.value * 0.18))
const grandTotal = computed(() => subtotal.value + shipping.value + tax.value)
const freeShippingProgress = computed(() => Math.min(100, (subtotal.value / 500) * 100))

function updateQty(item, delta) {
  cart.updateQty(item.id, item.qty + delta)
}

async function checkout() {
  if (cart.items.length === 0) return
  checkingOut.value = true
  await new Promise(r => setTimeout(r, 1500))
  cart.clear()
  checkingOut.value = false
  emit('close')
}
</script>

<template>
<Teleport to="body">
  <div class="fixed inset-0 z-50" @click="emit('close')">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      aria-hidden="true"
    />

    <!-- Cart Panel -->
    <aside
      class="absolute right-0 top-0 h-full w-full max-w-sm md:max-w-md bg-bg-card border-l border-border flex flex-col animate-slide-in-right"
      @click.stop
      role="dialog"
      aria-label="Shopping cart"
      aria-modal="true"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-border">
        <h2 class="font-display text-2xl font-medium text-fg">Your Cart</h2>
        <button
          @click="emit('close')"
          class="p-2 rounded-xl text-fg-muted hover:text-fg hover:bg-accent-dim transition-all duration-200"
          aria-label="Close cart"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" role="list" aria-label="Cart items">
        <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center h-64 text-center text-fg-muted">
          <svg class="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75A2.25 2.25 0 0118.75 6v16.5A2.25 2.25 0 0116.5 24.75H7.5A2.25 2.25 0 015.25 22.5V6A2.25 2.25 0 017.5 3.75h9m-6 0v-1.5a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75V3.75" />
          </svg>
          <p class="text-lg font-medium text-fg">Your cart is empty</p>
          <p class="text-sm mt-1 max-w-xs">Add some delicious coffee to get started!</p>
        </div>

        <ul v-else class="space-y-3" role="list">
          <li v-for="item in cart.items" :key="item.id" class="group relative" role="listitem">
            <div class="flex gap-4 p-3 bg-bg-elevated/50 rounded-xl border border-border/50 transition-all duration-200 hover:border-accent-dim">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                loading="lazy"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <h4 class="font-medium text-fg truncate">{{ item.name }}</h4>
                  <button
                    @click="cart.remove(item.id)"
                    class="p-1.5 rounded-lg text-fg-muted/50 hover:text-error hover:bg-error/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Remove item"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
                <p class="text-sm text-fg-muted mt-0.5">₹{{ item.price }} each</p>
                <div class="flex items-center gap-3 mt-3">
                  <div class="flex items-center gap-2 bg-bg rounded-xl border border-border p-1">
                    <button
                      @click="updateQty(item, -1)"
                      :disabled="item.qty <= 1"
                      class="p-1.5 rounded-lg text-fg-muted hover:text-fg hover:bg-accent-dim disabled:opacity-40 disabled:pointer-events-none transition-all duration-150"
                      aria-label="Decrease quantity"
                    >
                      <Minus class="w-4 h-4" />
                    </button>
                    <span class="w-10 text-center font-medium text-fg">{{ item.qty }}</span>
                    <button
                      @click="updateQty(item, 1)"
                      class="p-1.5 rounded-lg text-fg-muted hover:text-fg hover:bg-accent-dim transition-all duration-150"
                      aria-label="Increase quantity"
                    >
                      <Plus class="w-4 h-4" />
                    </button>
                  </div>
                  <span class="font-semibold text-fg ml-auto">₹{{ (item.price * item.qty).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Summary -->
      <div v-if="cart.items.length > 0" class="p-6 border-t border-border space-y-4">
        <!-- Free shipping bar -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-fg-muted">Free shipping at ₹500</span>
            <span class="font-medium text-fg">{{ freeShippingProgress }}%</span>
          </div>
          <div class="h-2 bg-bg-elevated rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full transition-all duration-500"
              :style="{ width: freeShippingProgress + '%' }"
            />
          </div>
        </div>

        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-fg-muted">Subtotal</span><span class="text-fg">₹{{ subtotal.toFixed(2) }}</span></div>
          <div class="flex justify-between"><span class="text-fg-muted">Shipping</span><span class="text-fg">{{ shipping === 0 ? 'Free' : '₹' + shipping }}</span></div>
          <div class="flex justify-between"><span class="text-fg-muted">Tax (18%)</span><span class="text-fg">₹{{ tax }}</span></div>
          <div class="flex justify-between border-t border-border pt-2">
            <span class="font-medium text-fg">Total</span>
            <span class="font-bold text-lg text-fg">₹{{ grandTotal.toFixed(2) }}</span>
          </div>
        </div>

        <button
          @click="checkout"
          :disabled="checkingOut"
          class="btn w-full py-4 text-lg gap-3"
        >
          <span>{{ checkingOut ? 'Processing...' : 'Proceed to Checkout' }}</span>
          <ArrowRight v-if="!checkingOut" class="w-5 h-5" />
          <Loader2 v-else class="w-5 h-5 animate-spin" />
        </button>

        <p class="text-xs text-center text-fg-muted/60">
          Secure checkout · 100% encrypted · Cancel anytime
        </p>
      </div>
    </aside>
  </div>
</Teleport>
</template>

<style scoped>
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-slide-in-right { animation: slideInRight 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
</style>