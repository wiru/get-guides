<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Search',
    caption: 'Search for Guides',
    icon: 'code',
    view: 'Search'
  },
  {
    title: 'My Profile',
    caption: 'Show/edit My Profile',
    icon: 'chat',
    view: 'MyProfile'
  },
  {
    title: 'Bookings',
    caption: 'Check your bookings',
    icon: 'book_online',
    view: 'Bookings'
  },
  {
    title: 'How to',
    caption: 'How to use the App',
    icon: 'question_mark',
    view: 'HowTo'
  },
  {
    title: 'Messages',
    caption: 'Your messages',
    icon: 'message',
    view: 'Messages'
  },
  {
    title: 'About Us',
    caption: 'The team behind Get Guides',
    icon: 'favorite',
    view: 'AboutUs'
  },
  {
    title: 'Logout',
    caption: 'Bye bye',
    icon: 'favorite',
    view: 'Logout'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
}
</script>
