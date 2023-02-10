import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import * as settingsService from '@/services/settings'

export const useSettingsStore = defineStore('counter', () => {
  const isLoaded = ref(false)
  const settings = reactive({
    profiles: [
      {
        id: '1',
        name: 'first-profile',
        timers: [
          { name: 'Підтягування 1', time: 60 },
          { name: 'Підтягування 2', time: 60 },
          { name: 'Підтягування 3', time: 60 },
          { name: 'Підтягування 4', time: 60 },
          { name: 'Підтягування 5', time: 60 },
          { name: 'Підтягування 6', time: 60 },

          { name: 'Присідання 1', time: 60 },
          { name: 'Присідання 2', time: 60 },
          { name: 'Присідання 3', time: 60 },
          { name: 'Присідання 4', time: 60 },
          { name: 'Присідання 5', time: 60 },
          { name: 'Присідання 6', time: 60 },

          { name: 'Віджимання 1', time: 60 },
          { name: 'Віджимання 2', time: 60 },
          { name: 'Віджимання 3', time: 60 },
          { name: 'Віджимання 4', time: 60 },
          { name: 'Віджимання 5', time: 60 },
          { name: 'Віджимання 6', time: 60 },

          { name: 'Випади 1', time: 60 },
          { name: 'Випади 2', time: 60 },
          { name: 'Випади 3', time: 60 },
          { name: 'Випади 4', time: 60 },
          { name: 'Випади 5', time: 60 },
          { name: 'Випади 6', time: 60 },

          { name: 'Прес 1', time: 60 },
          { name: 'Прес 2', time: 60 },
          { name: 'Прес 3', time: 60 },
          { name: 'Прес 4', time: 60 },
          { name: 'Прес 5', time: 60 },
          { name: 'Прес 6', time: 60 },
        ],
      },
    ],
    lastSelectedProfileId: null,
  })

  function load() {
    if (isLoaded.value) {
      return
    }

    isLoaded.value = true
    const loadedSettings = settingsService.load()
    Object.assign(settings, loadedSettings)
  }

  function save(nextSettings) {
    if (settingsService.save(nextSettings)) {
      Object.assign(settings, nextSettings)
    }
  }

  load()

  return { settings, save }
})
