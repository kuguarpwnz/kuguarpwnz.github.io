<template>
  <div
    ref="container"
    class="center progress-bar rounded-full"
    :class="value === 100 && 'blink'"
  >
    <progress class="hidden w-0 h-0" min="0" max="100" :value="value" />
  </div>
</template>

<script setup>
import { defineProps, ref, watchPostEffect } from 'vue'

const props = defineProps(['value'])

const container = ref()

watchPostEffect(() => {
  container.value.style.setProperty('--progress-value', props.value)
})
</script>

<style scoped>
.progress-bar {
  --progress-value: 0;

  width: 100%;
  height: 100%;

  background: radial-gradient(closest-side, #0f172a 80%, transparent 80%),
    conic-gradient(#34d399 calc(var(--progress-value) * 1%), #155e75 0);
}

@keyframes blink {
  from {
    /* TODO: add shadow effect instead */
    background: initial;
  }
}

.blink {
  animation: blink 600ms infinite;
}
</style>
