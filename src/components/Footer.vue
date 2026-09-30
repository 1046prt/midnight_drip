<script setup>
import { ref } from 'vue'
import { useUIStore } from '@/stores'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from '@lucide/vue'

const ui = useUIStore()
const email = ref('')
const isSubscribed = ref(false)

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Menu', href: '/#products' },
  { label: 'Brew Guides', href: '/#brew' },
  { label: 'Reviews', href: '/#testimonials' },
  { label: 'Visit Us', href: '/#visit' }
]

const socialLinks = [
  { name: 'Facebook', href: '#', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { name: 'Twitter', href: '#', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { name: 'Instagram', href: '#', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { name: 'YouTube', href: '#', path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
]

function subscribe() {
  if (!email.value || !email.value.includes('@')) {
    ui.showToast('Please enter a valid email address', 'error')
    return
  }
  isSubscribed.value = true
  ui.showToast('Thanks for subscribing!', 'success')
  email.value = ''
  setTimeout(() => { isSubscribed.value = false }, 3000)
}
</script>

<template>
  <footer id="contact" class="bg-bg-elevated border-t border-border">
    <div class="container mx-auto px-6 md:px-12 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center">
              <svg class="w-6 h-6 text-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span class="font-display text-2xl font-medium text-fg">Midnight Drip</span>
          </div>
          <p class="text-fg-muted leading-relaxed mb-6">
            Midnight Drip is a premium coffee company dedicated to providing the finest coffee beans
            and brewing experiences to our customers.
          </p>
          <div class="flex items-center gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              class="p-2.5 rounded-xl bg-bg-elevated text-fg-muted hover:text-accent hover:bg-accent-dim transition-all duration-200"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path :d="social.path" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-lg text-fg mb-6">Quick Links</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.label">
              <router-link
                :to="link.href"
                class="text-fg-muted hover:text-accent transition-colors duration-200"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-semibold text-lg text-fg mb-6">Contact Us</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span class="text-fg-muted">123 Coffee Street, Jaipur, Rajasthan</span>
            </li>
            <li class="flex items-start gap-3">
              <Phone class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span class="text-fg-muted">+91 9508015377</span>
            </li>
            <li class="flex items-start gap-3">
              <Mail class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span class="text-fg-muted">info@midnightdrip.com</span>
            </li>
            <li class="flex items-start gap-3">
              <Clock class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span class="text-fg-muted">Mon-Sun: 6:00 AM - 12:00 AM</span>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="font-semibold text-lg text-fg mb-6">Newsletter</h3>
          <p class="text-fg-muted mb-4">
            Subscribe to our newsletter for updates, promotions, and coffee tips!
          </p>
          <form @submit.prevent="subscribe" class="space-y-3">
            <div class="relative">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="w-full px-4 py-3 bg-bg-elevated border border-border rounded-xl text-fg placeholder-fg-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all pr-12"
                aria-label="Email address"
              />
              <button
                type="submit"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-fg-muted hover:text-accent hover:bg-accent-dim transition-all"
                aria-label="Subscribe"
              >
                <Send class="w-5 h-5" />
              </button>
            </div>
            <p v-if="isSubscribed" class="text-success text-sm flex items-center gap-2">
              <CheckCircle class="w-4 h-4" /> Subscribed successfully!
            </p>
          </form>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-fg-muted">
          &copy; 2025 Midnight Drip. All rights reserved.
        </p>
        <div class="flex items-center gap-6 text-sm text-fg-muted">
          <a href="#" class="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-accent transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>