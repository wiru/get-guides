<template>
  <q-page class="flex flex-center">
    <Search v-if="this.$store.state.currentView === 'Search'"/>
    <Bookings v-if="this.$store.state.currentView === 'Bookings'"/>
    <MyProfile v-if="this.$store.state.currentView === 'MyProfile'"/>
    <Messages v-if="this.$store.state.currentView === 'Messages'"/>
    <HowTo v-if="this.$store.state.currentView === 'HowTo'"/>
    <AboutUs v-if="this.$store.state.currentView === 'AboutUs'"/>
    <Login v-if="this.$store.state.currentView === 'Login'"/>
    <Logout v-if="this.$store.state.currentView === 'Logout'"/>
  </q-page>
</template>

<script>

import Search from '../components/Search.vue'
import Bookings from '../components/Bookings.vue'
import MyProfile from '../components/MyProfile.vue'
import Messages from '../components/Messages.vue'
import HowTo from '../components/HowTo.vue'
import AboutUs from '../components/AboutUs.vue'
import Login from '../components/Login.vue'
import Logout from '../components/Logout.vue'


export default {
  name: 'PageIndex',
  components: {
    Search,
    Bookings,
    MyProfile,
    Messages,
    HowTo,
    AboutUs,
    Login,
    Logout
  },
  methods: {
    whatever() {
      this.$store.commit("userView")
    },
    asyncWhatever() {
      this.$store.dispatch("asyncSomething")
    }
  }
}
</script>
