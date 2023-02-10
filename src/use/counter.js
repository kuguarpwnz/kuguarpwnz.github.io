import { onBeforeUnmount, ref } from 'vue'

export function useCounter(seconds) {
  let initialSeconds = seconds
  const value = ref(seconds)
  const isRunning = ref(false)

  let interval

  onBeforeUnmount(() => clearInterval(interval))

  // TODO: cleanup
  function start() {
    if (value.value <= 0) {
      return
    }

    isRunning.value = true
    interval = setInterval(() => {
      if (value.value > 0) {
        value.value -= 1

        if (value.value <= 0) {
          clearInterval(interval)
          isRunning.value = false
        }
      }
    }, 1000)
  }

  function pause() {
    clearInterval(interval)
    isRunning.value = false
  }

  function reset() {
    clearInterval(interval)
    isRunning.value = false
    value.value = initialSeconds
  }

  function change(nextSeconds) {
    initialSeconds = nextSeconds
    clearInterval(interval)
    isRunning.value = false
    value.value = nextSeconds
  }

  return {
    value,
    isRunning,
    start,
    pause,
    reset,
    change,
  }
}
