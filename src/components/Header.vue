<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore, useUIStore } from '@/stores'
import { Menu, X, Search, ShoppingCart } from '@lucide/vue'

const router = useRouter()
const route = useRoute()
const cart = useCartStore()
const ui = useUIStore()

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#products', label: 'Menu' },
  { href: '/#brew', label: 'Brew Guides' },
  { href: '/#testimonials', label: 'Reviews' },
  { href: '/#visit', label: 'Visit Us' }
]

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    const headerHeight = document.querySelector('header')?.offsetHeight || 80
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

async function scrollToSection(href) {
  mobileMenuOpen.value = false
  if (href.startsWith('/#')) {
    const id = href.slice(2)
    if (route.path !== '/') {
      await router.push('/')
      await nextTick()
      // Wait for the home view to render before scrolling
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)))
    } else {
      scrollToId(id)
    }
  } else {
    await router.push(href)
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    ui.openSearch()
  }
  if (e.key === 'Escape') {
    ui.closeSearch()
    cart.close()
    mobileMenuOpen.value = false
  }
}

watch(() => ui.isSearchOpen, open => {
  if (open) mobileMenuOpen.value = false
})

watch(() => cart.isOpen, open => {
  if (open) mobileMenuOpen.value = false
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      'bg-bg/80 backdrop-blur-md border-b border-border/30',
      isScrolled ? 'shadow-soft border-border/50' : ''
    ]"
  >
    <nav class="container mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-18">
      <!-- Logo -->
      <a href="/" @click.prevent="scrollToSection('/')" class="flex items-center gap-3 z-20" aria-label="Midnight Drip Home">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center shadow-glow">
          <svg class="w-6 h-6 text-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <span class="font-display text-xl md:text-2xl font-medium text-fg hidden sm:block">Midnight Drip</span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-8">
        <ul class="flex items-center gap-1" role="navigation" aria-label="Main navigation">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              @click.prevent="scrollToSection(link.href)"
              class="relative px-3 py-2 text-sm font-medium text-fg-muted hover:text-fg transition-colors duration-200 rounded-lg hover:bg-accent-dim"
              :class="{ 'text-accent': router.currentRoute.value.path === link.href || router.currentRoute.value.hash === '#' + link.href.replace('/#', '') }"
            >
              {{ link.label }}
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-300 rounded-full" :class="{ 'w-full': router.currentRoute.value.path === link.href || router.currentRoute.value.hash === '#' + link.href.replace('/#', '') }" />
            </a>
          </li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <!-- Search Trigger -->
        <button
          @click="ui.openSearch"
          class="p-2 rounded-xl text-fg-muted hover:text-fg hover:bg-accent-dim transition-all duration-200 relative"
          aria-label="Search (⌘K)"
          :aria-expanded="ui.isSearchOpen"
        >
          <Search class="w-5 h-5" />
          <kbd class="absolute -top-2 -right-2 hidden md:block text-[10px] px-1.5 py-0.5 bg-bg-elevated border border-border rounded text-fg-muted/60 font-mono">⌘K</kbd>
        </button>

        <!-- Cart -->
        <button
          @click="cart.toggle"
          class="relative p-2 rounded-xl text-fg-muted hover:text-fg hover:bg-accent-dim transition-all duration-200"
          :aria-label="`Cart (${cart.count} items)`"
          :aria-expanded="cart.isOpen"
        >
          <ShoppingCart class="w-5 h-5" />
          <span v-if="cart.count > 0" class="absolute -top-1 -right-1 min-w-[18px] h-5 bg-accent text-bg text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 animate-scale-in">
            {{ cart.count > 99 ? '99+' : cart.count }}
          </span>
        </button>

        <!-- Mobile Menu -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-xl text-fg hover:bg-accent-dim transition-colors"
          :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="mobileMenuOpen"
        >
          <X v-if="mobileMenuOpen" class="w-6 h-6" />
          <Menu v-else class="w-6 h-6" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Panel -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden fixed inset-0 z-40 bg-bg/98 backdrop-blur-sm animate-fade-in"
      @click="mobileMenuOpen = false"
    >
      <div class="flex flex-col items-center justify-center h-full gap-8 animate-slide-up">
        <a
          v-for="link in navLinks"
          :key="link.href"
          @click.stop="scrollToSection(link.href)"
          class="text-2xl font-display font-medium text-fg hover:text-accent transition-colors"
        >
          {{ link.label }}
        </a>
        <div class="flex items-center gap-6 pt-4">
          <button @click.stop="ui.openSearch(); mobileMenuOpen = false" class="flex items-center gap-2 text-lg text-fg-muted hover:text-accent transition-colors">
            <Search class="w-6 h-6" /> Search
          </button>
          <button @click.stop="cart.toggle(); mobileMenuOpen = false" class="flex items-center gap-2 text-lg text-fg-muted hover:text-accent transition-colors relative">
            <ShoppingCart class="w-6 h-6" />
            Cart
            <span v-if="cart.count > 0" class="absolute -top-2 -right-2 min-w-[18px] h-5 bg-accent text-bg text-[10px] font-bold rounded-full flex items-center justify-center px-1.5">
              {{ cart.count }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in { animation: scaleIn 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
</style>