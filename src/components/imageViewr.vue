<template>
  <div class="zoom-image-container">
    <img :src="src" :alt="alt" class="zoom-target" @click="toggleZoom">

    <Transition name="fade">
      <div v-show="isZoomed" class="zoom-overlay" @click.self="toggleZoom">
        <img :src="src" :alt="alt" class="zoomed-image">
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: String,
  alt: String
})

const isZoomed = ref(false)

function toggleZoom() {
  isZoomed.value = !isZoomed.value
  // 阻止滚动穿透
  document.body.style.overflow = isZoomed.value ? 'hidden' : ''
}
</script>

<style scoped>
.zoom-image-container {
  position: relative;
  display: inline-block;
}

.zoom-target {
  cursor: zoom-in;
  max-width: 100%;
  transition: transform 0.2s ease;
  border-radius: 6px;
}

.zoom-target:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: zoom-out;
  backdrop-filter: blur(4px);
}

.zoomed-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  animation: zoomIn 0.3s ease forwards;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .zoomed-image {
    max-width: 95%;
    max-height: 85%;
  }
}
</style>