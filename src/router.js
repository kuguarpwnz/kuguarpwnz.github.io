import { createRouter, createWebHistory } from 'vue-router'

import { useSettingsStore } from '@/stores/settings'

import TrainProfileView from '@/views/profile/TrainProfileView.vue'
import ProfilesView from '@/views/profile/ProfilesView.vue'
import ProfileView from '@/views/profile/TrainProfileView.vue'
import NewProfileView from '@/views/profile/NewProfileView.vue'
import EditProfileView from '@/views/profile/EditProfileView.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'profiles' },
  },
  {
    path: '/profiles',
    name: 'profiles',
    component: ProfilesView,
  },
  {
    path: '/profile/:id',
    component: ProfileView,
    children: [
      {
        path: '',
        name: 'edit-profile',
        component: EditProfileView,
      },
      {
        path: 'new',
        name: 'new-profile',
        component: NewProfileView,
      },
      {
        path: 'train',
        name: 'train-profile',
        component: TrainProfileView,
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    component: () =>
      import(/* webpackChunkName: "about" */ './views/SettingsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const { settings } = useSettingsStore()

  if (!settings.profiles.length) {
    next({ name: 'new-profile' })
  } else {
    // TODO: add check if profile doesn't exist redirect to new?
    next()
  }
})

export default router
