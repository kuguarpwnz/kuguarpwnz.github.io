<template>
  <div class="flex flex-col items-center justify-between h-full">
    <div class="flex flex-col items-center gap-y-8">
      <div class="flex relative w-min">
        <div class="w-72 aspect-square">
          <Progress :value="progress" />
        </div>

        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
        >
          {{ counter.value }}
        </div>
      </div>

      <div
        class="flex flex-col gap-y-2"
        :class="counter.isRunning.value && 'opacity-0'"
      >
        <button
          :class="counter.value.value === timer.time && 'opacity-0'"
          class="button"
          @click="counter.reset"
        >
          Reset
        </button>

        <div class="flex gap-x-2">
          <button class="button" @click="handleTimerChange(timerIndex - 1)">
            Prev
          </button>
          <button class="button" @click="handleTimerChange(timerIndex + 1)">
            Next
          </button>
        </div>
      </div>
    </div>

    <div class="flex text-3xl">
      {{ timer.name }}
    </div>

    <div class="flex flex-col w-40">
      <button
        v-if="counter.value.value <= 0"
        class="button flex-grow"
        @click="handleTimerChange(timerIndex + 1)"
      >
        Next
      </button>
      <button
        v-else
        class="button flex-grow"
        @click="counter.isRunning.value ? counter.pause() : counter.start()"
      >
        {{ counter.isRunning.value ? 'Pause' : 'Start' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchPostEffect } from 'vue'
import { useRoute } from 'vue-router'

import { useSettingsStore } from '@/stores/settings'
import { useCounter } from '@/use/counter'

import Progress from '@/components/progress/Progress.vue'

const route = useRoute()

const { settings } = useSettingsStore()
const { profiles } = settings

const profile = profiles.find(({ id }) => id === route.params.id)

const timerIndex = ref(0)
const timer = computed(() => profile.timers[timerIndex.value])

const isFinished = ref(false)

const counter = useCounter(timer.value.time)

const progress = computed(() =>
  Math.round((1 - counter.value.value / timer.value.time) * 100)
)

function handleTimerChange(nextTimerIndex) {
  if (nextTimerIndex < 0 || nextTimerIndex > profile.timers.length - 1) {
    return
  }

  timerIndex.value = nextTimerIndex
}

watchPostEffect(() => {
  if (counter.value.value === 0) {
    if (timerIndex.value < profile.timers.length - 1) {
      // timerIndex.value += 1
    } else {
      isFinished.value = true
    }
  }
})

watchPostEffect(() => {
  counter.change(timer.value.time)
})
</script>
