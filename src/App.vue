<script setup>
import { RouterView } from 'vue-router'
import { useCartStore, useUIStore } from '@/stores'
import Header from '@/components/Header.vue'
import CartSidebar from '@/components/CartSidebar.vue'
import SearchOverlay from '@/components/SearchOverlay.vue'
import ToastContainer from '@/components/ToastContainer.vue'
import PageTransition from '@/components/PageTransition.vue'

const ui = useUIStore()
const cart = useCartStore()
ui.init()
</script>

<template>
  <div class="min-h-screen bg-bg font-sans">
    <Header />
    <main id="main-content" class="relative z-10">
      <PageTransition>
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </PageTransition>
    </main>
    <CartSidebar v-if="cart.isOpen" @close="cart.close" />
    <SearchOverlay v-if="ui.isSearchOpen" @close="ui.closeSearch" />
    <ToastContainer :toasts="ui.toasts" @dismiss="ui.dismiss" />
  </div>
</template>

<style scoped>
/* Global scroll behavior handled by Lenis */
</style>