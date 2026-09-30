<script setup>
import { galleryPhotos } from '@/data/images'

const loop = [...galleryPhotos, ...galleryPhotos]
</script>

<template>
  <section aria-label="Coffee gallery" class="py-10 overflow-hidden border-y border-border/50 bg-bg-elevated/30">
    <div class="marquee flex gap-4 w-max">
      <figure
        v-for="(photo, i) in loop"
        :key="i"
        class="relative w-52 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden flex-shrink-0 border border-border/50"
        aria-hidden="true"
      >
        <img
          :src="photo.src"
          :alt="photo.alt"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent" />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  animation: marquee 45s linear infinite;
}
.marquee:hover {
  animation-play-state: paused;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee { animation: none; }
}
</style>