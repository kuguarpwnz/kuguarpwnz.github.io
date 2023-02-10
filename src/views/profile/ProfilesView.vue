<template>
  <div class="card" v-for="profile in profiles" :key="profile.id">
    <router-link :to="{ name: 'edit-profile', params: { id: profile.id } }">
      <header class="card-header">
        <p class="card-header-title">
          {{ profile.name }}
        </p>
      </header>
    </router-link>
  </div>
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'

const { settings } = useSettingsStore()
const { profiles } = settings
</script>
