import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isOpen = ref(false)

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('midnight-drip-cart')
      if (stored) items.value = JSON.parse(stored)
    } catch { items.value = [] }
  }

  const saveToStorage = () => {
    localStorage.setItem('midnight-drip-cart', JSON.stringify(items.value))
  }

  const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2))
  const formattedTotal = computed(() => `₹${total.value}`)

  function add(product, qty = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) existing.qty += qty
    else items.value.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty })
    saveToStorage()
  }

  function remove(id) {
    items.value = items.value.filter(i => i.id !== id)
    saveToStorage()
  }

  function updateQty(id, qty) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.qty = Math.max(1, qty)
      saveToStorage()
    }
  }

  function clear() {
    items.value = []
    saveToStorage()
  }

  function toggle() { isOpen.value = !isOpen.value }
  function open() { isOpen.value = true }
  function close() { isOpen.value = false }

  loadFromStorage()

  return { items, isOpen, count, total, formattedTotal, add, remove, updateQty, clear, toggle, open, close }
})

export const useUIStore = defineStore('ui', () => {
  const isSearchOpen = ref(false)
  const searchQuery = ref('')
  const activeFilter = ref('all')
  const toasts = ref([])
  const prefersReducedMotion = ref(false)

  const filters = ['all', 'espresso', 'cold', 'specialty']

  function openSearch() { isSearchOpen.value = true }
  function closeSearch() { isSearchOpen.value = false }
  function toggleSearch() { isSearchOpen.value = !isSearchOpen.value }

  function setFilter(f) { activeFilter.value = f }
  function setQuery(q) { searchQuery.value = q }

  function showToast(message, type = 'info', duration = 3500) {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, message, type })
    setTimeout(() => dismiss(id), duration)
  }

  function dismiss(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function init() {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  return { isSearchOpen, searchQuery, activeFilter, toasts, prefersReducedMotion, filters,
    openSearch, closeSearch, toggleSearch, setFilter, setQuery, showToast, dismiss, init }
})