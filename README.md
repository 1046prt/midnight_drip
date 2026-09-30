# Midnight Drip — Premium Coffee Store

A modern, animated, and highly interactive coffee store built with **Vue 3**, **Vite**, **Tailwind CSS v4**, and **Motion**.

## Features

- **Vue 3 + Vite** — Fast dev server and optimized production builds
- **Tailwind CSS v4** — Utility-first styling with custom design tokens
- **Motion (motion-v)** — Smooth animations and transitions
- **Lenis** — Buttery smooth scrolling
- **Pinia** — State management for cart and UI
- **Vue Router** — Client-side routing with page transitions
- **Lucide Icons** — Beautiful, consistent iconography

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Tests

```bash
# Static check: every @/ import resolves to a real file
node .kilo/check-imports.js

# Logic tests: real Pinia stores + product data (36 assertions)
npx esbuild .kilo/store-tests.js --bundle --platform=node --format=cjs --alias:@=./src --loader:.json=json --outfile=.kilo/store-tests.bundle.cjs --log-level=error && node .kilo/store-tests.bundle.cjs
```

## Project Structure

```
src/
├── assets/          # Static assets (images, etc.)
├── components/      # Reusable Vue components
│   ├── Header.vue
│   ├── Footer.vue
│   ├── HeroSection.vue
│   ├── AboutSection.vue
│   ├── ProductsSection.vue
│   ├── ProductCard.vue
│   ├── BrewGuides.vue
│   ├── Gallery.vue
│   ├── TestimonialsSection.vue
│   ├── Faq.vue
│   ├── VisitUs.vue
│   ├── CartSidebar.vue
│   ├── SearchOverlay.vue
│   ├── ToastContainer.vue
│   └── PageTransition.vue
├── composables/     # Vue composables
│   └── useScroll.js
├── data/            # Static data
│   └── products.js
├── stores/          # Pinia stores
│   └── index.js
├── styles/          # Global styles
│   └── main.css
├── views/           # Page components
│   ├── Home.vue
│   ├── ProductDetail.vue
│   ├── Cart.vue
│   └── NotFound.vue
├── App.vue          # Root component
└── main.js          # App entry point
```

## Key Features

### Animations & Interactions
- Smooth scroll with Lenis
- Page transitions with Vue Router
- Scroll-triggered animations with IntersectionObserver
- Hover effects on cards and buttons
- Floating elements in hero section
- Animated cart sidebar
- Toast notifications

### UI Components
- Responsive header with mobile menu
- Product grid with filtering and sorting
- Product detail pages with tabs
- Shopping cart with quantity controls
- Search overlay with keyboard navigation
- Newsletter subscription form
- Testimonials section

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Reduced motion support
- Semantic HTML

## License

MIT
