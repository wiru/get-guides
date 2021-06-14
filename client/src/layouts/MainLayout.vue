<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar v-if="this.$store.state.currentView !== 'Login'">
        <q-btn
          v-if="
            this.$store.state.userType === 'traveller' ||
              this.$store.state.userType === 'guide' ||
              this.$store.state.userType === 'admin'
          "
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{ this.$store.state.currentView }}
        </q-toolbar-title>

        <q-btn
          v-if="
            this.$store.state.currentView === 'Messages' ||
              this.$store.state.currentView === 'SelectedProfile' ||
              this.$store.state.currentView === 'SearchResults'
          "
          @click="goBack"
          dense
          flat
          icon="arrow_back"
          label="Back"
        />
      </q-toolbar>
    </q-header>

    <q-drawer class="text-white" color="white" v-model="leftDrawerOpen" content-class="bg-primary">
      <q-list>
        <div class="flex column flex-center">
          <q-img class="q-ma-lg" src="../assets/GG1.png" style="max-width:40%; height:auto" />
          <q-img class="q-mb-lg" src="../assets/GetGuides.png" style="max-width:60%; height:auto" />
        </div> 

        <div 
        v-if="this.$store.state.userType === 'traveller'">
          <SearchLink
            class="text-h6"
            v-for="link in searchLinks"
            :key="link.title"
            v-bind="link"
            @clicked="leftDrawerOpen = !leftDrawerOpen"
          />
        </div>

        <div 
        v-if="this.$store.state.userType === 'guide'">
          <ProfileLink
            class="text-h6"
            v-for="link in profileLinks"
            :key="link.title"
            v-bind="link"
            @clicked="leftDrawerOpen = !leftDrawerOpen"
          />
        </div>

        <EssentialLink
          class="text-h6"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @clicked="leftDrawerOpen = !leftDrawerOpen"
        />

        <EssentialLink
          class="text-h6"
          v-if="this.$store.state.loggedIn === true"
          :key="logoutData.title"
          v-bind="logoutData"
        />
      </q-list>
    </q-drawer>
    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import socket from "../socket";
import EssentialLink from "components/EssentialLink.vue";
import ProfileLink from "components/ProfileLink.vue";
import SearchLink from "components/SearchLink.vue";
const logoutData = {
  title: "Logout",
  caption: "Bye bye",
  icon: "logout",
  view: "Logout"
};

const profileData = [
  {
    title: "My Profile",
    caption: "Show and edit your own Profile",
    icon: "person",
    view: "My Profile"
  }
];

const searchData = [
  {
    title: "Search",
    caption: "Search for Guides",
    icon: "search",
    view: "Search"
  },
];

const linksData = [
  {
    title: "Bookings",
    caption: "Check your bookings",
    icon: "book_online",
    view: "Bookings"
  },
  {
    title: "How to",
    caption: "How to use the App",
    icon: "help_outline",
    view: "How to"
  },
  {
    title: "Chats",
    caption: "Your chats",
    icon: "message",
    view: "Chats"
  },
  {
    title: "About Us",
    caption: "The team behind Get Guides",
    icon: "favorite",
    view: "AboutUs"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink, ProfileLink, SearchLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      profileLinks: profileData,
      searchLinks: searchData,
      logoutData: logoutData
    };
  },
  methods: {
    goBack() {
      if (this.$store.state.currentView === "Messages")
        this.$store.commit("changeView", "Chats");
      else if (this.$store.state.currentView === "SearchResults")
        this.$store.commit("changeView", "Search");
      else if (this.$store.state.currentView === "SelectedProfile")
        this.$store.commit("changeView", "SearchResults");
    }
  }
};
</script>
<style lang="scss">
body {
  background-color: $teal-1;
  background-image: url("../assets/brushDiag.png") repeat 0 0;

}
</style>