import { createPinia, setActivePinia } from 'pinia'
import { useCartStore, useUIStore } from '@/stores'
import { products, categories, getProductById, getProductsByCategory } from '@/data/products'

const results = []
function check(name, cond) {
  results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}`)
  if (!cond) process.exitCode = 1
}

// ---- localStorage stub (Node has none) ----
const mem = {}
global.localStorage = {
  getItem: (k) => (k in mem ? mem[k] : null),
  setItem: (k, v) => { mem[k] = String(v) },
  removeItem: (k) => { delete mem[k] }
}

setActivePinia(createPinia())

// ---- products data ----
check('16 products loaded', products.length === 16)
check('all products have id/name/price/image', products.every(p => p.id && p.name && p.price > 0 && p.image.startsWith('https://')))
check('getProductById(espresso)', getProductById('espresso')?.name === 'Espresso')
check('getProductById(flav-white)', getProductById('flat-white')?.price === 180)
check('getProductById(bogus) undefined', getProductById('nope') === undefined)
check('espresso category count = 11', getProductsByCategory('espresso').length === 11)
check('cold category count = 2', getProductsByCategory('cold').length === 2)
check('specialty category count = 3', getProductsByCategory('specialty').length === 3)
check('all category count = 16', getProductsByCategory('all').length === 16)
check('categories metadata present', categories.length === 4)

// ---- cart store ----
const cart = useCartStore()
check('cart starts empty', cart.count === 0 && cart.total === '0.00')
const esp = getProductById('espresso')
cart.add(esp, 2)
check('add 2x espresso -> count 2', cart.count === 2)
check('total = 240.00', cart.total === '240.00')
cart.add(esp, 1)
check('add same product merges qty -> 3', cart.count === 3 && cart.items.length === 1)
const lat = getProductById('latte')
cart.add(lat, 1)
check('second product -> 2 lines, count 4', cart.items.length === 2 && cart.count === 4)
cart.updateQty('espresso', 1)
check('updateQty espresso -> 1', cart.items.find(i => i.id === 'espresso').qty === 1)
check('persisted to localStorage', JSON.parse(mem['midnight-drip-cart']).length === 2)
cart.remove('latte')
check('remove latte -> 1 line', cart.items.length === 1 && cart.count === 1)
check('formattedTotal has ₹', cart.formattedTotal.startsWith('₹'))
cart.clear()
check('clear empties cart', cart.count === 0 && cart.items.length === 0)

// cart sidebar open/close (the App.vue wiring bug area)
check('cart closed by default', cart.isOpen === false)
cart.open()
check('cart.open() -> isOpen true', cart.isOpen === true)
cart.toggle()
check('cart.toggle() -> false', cart.isOpen === false)
cart.toggle(); cart.close()
check('cart.close() -> false', cart.isOpen === false)

// ---- ui store ----
const ui = useUIStore()
ui.setFilter('cold')
check('setFilter cold', ui.activeFilter === 'cold')
check('filter list has all/espresso/cold/specialty', ui.filters.join(',') === 'all,espresso,cold,specialty')
ui.setQuery('latte')
check('setQuery latte', ui.searchQuery === 'latte')
ui.openSearch()
check('openSearch', ui.isSearchOpen === true)
ui.closeSearch()
check('closeSearch', ui.isSearchOpen === false)
ui.toggleSearch()
check('toggleSearch opens', ui.isSearchOpen === true)
ui.showToast('hello', 'success', 50)
check('toast queued', ui.toasts.length === 1 && ui.toasts[0].message === 'hello')
ui.dismiss(ui.toasts[0].id)
check('toast dismissed', ui.toasts.length === 0)

// ---- Home filtering logic mirror ----
function homeFilter(list, cat, q, sort) {
  let r = cat === 'all' ? [...list] : list.filter(p => p.category === cat)
  if (q.trim()) { const s = q.toLowerCase().trim(); r = r.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)) }
  if (sort === 'price-asc') r = [...r].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') r = [...r].sort((a, b) => b.price - a.price)
  if (sort === 'name') r = [...r].sort((a, b) => a.name.localeCompare(b.name))
  return r
}
check('search "cold" finds Cold Brew + Nitro', homeFilter(products, 'all', 'cold', 'default').length >= 2)
check('search+filter espresso+latte -> Latte only', JSON.stringify(homeFilter(products, 'espresso', 'latte', 'default').map(p => p.id)) === '["latte"]')
check('price-asc starts at 120', homeFilter(products, 'all', '', 'price-asc')[0].price === 120)
check('price-desc starts at 250', homeFilter(products, 'all', '', 'price-desc')[0].price === 250)

console.log(results.join('\n'))
console.log(`\n${results.filter(r => r.startsWith('PASS')).length}/${results.length} passed`)
