import images from '@/assets/images.json'

/** Build a Pexels CDN URL for a known photo ID with custom dimensions. */
export function px(id, w = 1200, h = 900) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`
}

export const photos = images

export const galleryPhotos = [
  { src: px(9501559, 800, 1000), alt: 'Espresso shot' },
  { src: px(6747870, 800, 1000), alt: 'Cappuccino with foam art' },
  { src: px(459489, 800, 1000), alt: 'Latte art' },
  { src: px(13735958, 800, 1000), alt: 'Cold brew' },
  { src: px(35229818, 800, 1000), alt: 'Affogato dessert' },
  { src: px(31330206, 800, 1000), alt: 'Turkish coffee' },
  { src: px(16682442, 800, 1000), alt: 'Roasted coffee beans' },
  { src: px(5373256, 800, 1000), alt: 'Coffee shop bar' }
]
