<script setup>
import { ref } from 'vue'
import { Plus } from '@lucide/vue'

const openIndex = ref(0)

const faqs = [
  {
    q: 'Are your beans freshly roasted?',
    a: 'Yes. We roast in small batches every week and print the roast date on every bag. For peak flavor, brew within 2–4 weeks of the roast date.'
  },
  {
    q: 'Do you offer free shipping?',
    a: 'Orders over ₹500 ship free across India. A flat ₹50 shipping fee applies below that. Orders are dispatched within 24 hours and arrive in 3–5 business days.'
  },
  {
    q: 'Whole bean or ground — which should I choose?',
    a: 'Whole bean stays fresh longest, so choose it if you own a grinder. Otherwise pick a grind matched to your brewer: fine for espresso, medium for pour over, coarse for French press.'
  },
  {
    q: 'What is your return policy?',
    a: 'Unopened bags can be returned within 15 days for a full refund. If a brew ever tastes off, tell us and we will replace the bag — no questions asked.'
  },
  {
    q: 'Do you have a subscription plan?',
    a: 'Yes. Subscribe and save 15% on every order with free shipping. Choose your coffee, grind, and delivery frequency — pause or cancel anytime from your account.'
  },
  {
    q: 'Is your coffee ethically sourced?',
    a: 'We buy from estates and cooperatives that pay above fair-trade rates, and every lot is traceable back to the farm it was grown on.'
  }
]

function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="section">
    <div class="container mx-auto max-w-3xl">
      <div class="text-center mb-12">
        <span class="badge mb-4">FAQ</span>
        <h2 class="heading-lg mb-4">Questions, Answered</h2>
        <p class="text-fg-muted text-lg">Everything you need to know about our coffee, shipping, and returns.</p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="bg-bg-card border border-border rounded-xl overflow-hidden transition-colors"
          :class="{ 'border-accent/40': openIndex === i }"
        >
          <button
            @click="toggle(i)"
            :aria-expanded="openIndex === i"
            :aria-controls="`faq-panel-${i}`"
            class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span class="font-medium text-fg">{{ faq.q }}</span>
            <span
              class="p-1.5 rounded-lg bg-accent-dim text-accent flex-shrink-0 transition-transform duration-300"
              :class="{ 'rotate-45': openIndex === i }"
            >
              <Plus class="w-5 h-5" />
            </span>
          </button>
          <div
            :id="`faq-panel-${i}`"
            class="grid transition-all duration-300"
            :class="openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
          >
            <div class="overflow-hidden">
              <p class="px-5 pb-5 text-fg-muted leading-relaxed">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>