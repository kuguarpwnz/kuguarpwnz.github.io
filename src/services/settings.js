export const SETTINGS_KEY = 'settings'

export function load() {
  const serializedSettings = localStorage.getItem(SETTINGS_KEY)

  return deserialize(serializedSettings)
}

export function save(settings) {
  const serializedSettings = serialize(settings)

  if (serializedSettings) {
    localStorage.setItem(SETTINGS_KEY, serializedSettings)

    return true
  }

  return false
}

export function serialize(settings) {
  try {
    return JSON.stringify(settings)
  } catch {
    console.warn('Unable to serialize settings', settings)

    return null
  }
}

export function deserialize(settings) {
  try {
    return JSON.parse(settings)
  } catch {
    console.warn('Unable to deserialize settings', settings)
    return null
  }
}
