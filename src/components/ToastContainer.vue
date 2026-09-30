<script setup>
import { computed } from 'vue'
import { CheckCircle, AlertCircle, Info, X, Loader2 } from '@lucide/vue'

const props = defineProps({
  toasts: { type: Array, default: () => [] }
})
const emit = defineEmits(['dismiss'])

const icons = { success: CheckCircle, error: AlertCircle, info: Info, loading: Loader2 }
const colors = {
  success: 'border-success text-success bg-success/10',
  error: 'border-error text-error bg-error/10',
  info: 'border-accent text-accent bg-accent/10',
  loading: 'border-accent text-accent bg-accent/10'
}

function getIcon(type) {
  return icons[type] || icons.info
}
</script>

<template>
<Teleport to="body">
  <div
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col-reverse items-center gap-3 pointer-events-none"
    aria-live="polite"
    aria-atomic="true"
  >
    <TransitionGroup name="toast" tag="div" class="w-full max-w-sm">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'toast-item pointer-events-auto relative flex items-start gap-3 p-4 rounded-xl border shadow-elevated animate-toast-in',
          colors[toast.type] || colors.info
        ]"
        role="alert"
        :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
      >
        <component
          :is="getIcon(toast.type)"
          :class="[
            'w-5 h-5 flex-shrink-0 mt-0.5',
            toast.type === 'loading' && 'animate-spin'
          ]"
          aria-hidden="true"
        />
        <p class="flex-1 text-sm font-medium leading-relaxed">{{ toast.message }}</p>
        <button
          @click="emit('dismiss', toast.id)"
          class="p-1 rounded-lg hover:bg-black/20 transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</Teleport>
</template>

<style scoped>
@keyframes toastIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes toastOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(-10px) scale(0.95); }
}
.toast-item { animation: toastIn 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.toast-leave-active { animation: toastOut 200ms ease-in forwards; }
</style>