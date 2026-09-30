import espressoImg from '@/assets/images.json'

export const products = [
  { id: 'espresso', name: 'Espresso', category: 'espresso', description: 'Strong, rich, and concentrated — the heart of Italian coffee culture.', price: 120, image: espressoImg.espresso.url },
  { id: 'americano', name: 'Americano', category: 'espresso', description: 'A smooth blend of espresso and hot water for a mellow, rich taste.', price: 140, image: espressoImg.americano.url },
  { id: 'cappuccino', name: 'Cappuccino', category: 'espresso', description: 'Perfect balance of espresso, steamed milk, and frothy foam.', price: 160, image: espressoImg.cappuccino.url },
  { id: 'latte', name: 'Latte', category: 'espresso', description: 'Velvety espresso with a generous layer of creamy steamed milk.', price: 170, image: espressoImg.latte.url },
  { id: 'macchiato', name: 'Macchiato', category: 'espresso', description: 'Espresso "stained" with milk foam — bold with a hint of smoothness.', price: 150, image: espressoImg.macchiato.url },
  { id: 'flat-white', name: 'Flat White', category: 'espresso', description: 'Espresso with silky microfoam — smooth and strong in every sip.', price: 180, image: espressoImg['flat-white'].url },
  { id: 'cold-brew', name: 'Cold Brew', category: 'cold', description: 'Brewed slowly in cold water for a smooth, less acidic experience.', price: 190, image: espressoImg['cold-brew'].url },
  { id: 'mocha', name: 'Mocha', category: 'espresso', description: 'Espresso meets chocolate and milk for a sweet, indulgent treat.', price: 200, image: espressoImg.mocha.url },
  { id: 'affogato', name: 'Affogato', category: 'specialty', description: 'Vanilla ice cream drowned in hot espresso — dessert meets coffee.', price: 220, image: espressoImg.affogato.url },
  { id: 'cortado', name: 'Cortado', category: 'espresso', description: 'Equal parts espresso and warm milk — bold yet balanced.', price: 160, image: espressoImg.cortado.url },
  { id: 'irish-coffee', name: 'Irish Coffee', category: 'specialty', description: 'A bold mix of coffee, whiskey, and cream for a warming twist.', price: 250, image: espressoImg['irish-coffee'].url },
  { id: 'ristretto', name: 'Ristretto', category: 'espresso', description: 'A short shot of espresso with a richer, more intense flavor.', price: 130, image: espressoImg.ristretto.url },
  { id: 'nitro', name: 'Nitro Coffee', category: 'cold', description: 'Cold brew infused with nitrogen for a creamy, fizzy texture.', price: 210, image: espressoImg.nitro.url },
  { id: 'breve', name: 'Breve', category: 'espresso', description: 'Espresso with steamed half-and-half — rich, velvety, and creamy.', price: 180, image: espressoImg.breve.url },
  { id: 'doppio', name: 'Doppio', category: 'espresso', description: 'A double shot of espresso for double the strength and flavor.', price: 140, image: espressoImg.doppio.url },
  { id: 'turkish', name: 'Turkish Coffee', category: 'specialty', description: 'Finely ground coffee simmered unfiltered — rich, thick, and aromatic.', price: 230, image: espressoImg.turkish.url }
]

export const categories = [
  { id: 'all', label: 'All', icon: 'coffee' },
  { id: 'espresso', label: 'Espresso-Based', icon: 'cup' },
  { id: 'cold', label: 'Cold Coffee', icon: 'ice' },
  { id: 'specialty', label: 'Specialty', icon: 'sparkles' }
]

export function getProductById(id) {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(cat) {
  if (cat === 'all') return products
  return products.filter(p => p.category === cat)
}