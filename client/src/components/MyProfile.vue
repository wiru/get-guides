<template>
<q-page class="q-pa-md full-width">
  <div class="flex row q-mb-sm">
    <q-card class="my-card col-8    ">
      <q-card-section class="teal-9">
        <div class="text-h6">{{this.$store.state.guideSelf.name}}</div>
        <div class="text-subtitle2">Professional Guide</div>
      </q-card-section>
      <!-- PLACE AND LANGUAGES TAB -->
      <q-tabs v-model="tab" class="text-teal-9">
        <q-tab label="Places" name="places" />
        <q-tab label="Languages" name="languages" />
      </q-tabs>

      <q-separator />

      <!-- PLACES TAB -->
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="places" class="q-pa-none">
        <q-tabs
          v-model="tab"
          inline-label
          outside-arrows
          mobile-arrows       
          class="bg-primary shadow-2 text-white"
        >
          <q-tab 
          v-for="location in this.$store.state.guideSelf.locations"
          :key="location.fakeValueThatIMadeUp"
          class="text-white q-px-md q-ma-xs">
          {{ location }}
              
            </q-tab>
          </q-tabs>
        </q-tab-panel>
          
      <!-- LANGUAGES TAB --> 
      <q-tab-panel name="languages" class="q-pa-none">
        <q-tabs
          v-model="tab"
          inline-label
          outside-arrows
          mobile-arrows
          class="bg-primary shadow-2 text-white"
        >
          <q-tab 
          v-for="language in this.$store.state.guideSelf.languages"
          :key="language.fakeValueThatIMadeUp"
          class="text-white q-px-md q-ma-xs">
          {{ language }}
              
            </q-tab>
          </q-tabs>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <!-- EDIT PAGE LINK -->
    <div class="q-pl-sm flex justify-center flex-center column col">
      <q-img class="q-mb-sm col full-width rounded-borders" v-bind:src="this.$store.state.guideSelf.avatar" />
      <q-btn class="full-width" :loading="loading1" color="primary" @click="simulateProgress(1); editProfile()" label="Button" />
    </div>
  </div>
    <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        arrows
        padding
        height="250px"
        class="q-mb-md bg-primary text-white shadow-1"
      >
      <!-- CAROUSEL SCREEN 1 -->
        <q-carousel-slide name="style" class="text-center"  >
          <q-scroll-area class="fit">
            <q-icon class="q-pt-lg" name="hiking" size="36px" />
            <div class="q-mt-md text-center">
              {{ this.$store.state.guideSelf.bio }}
            </div>
          </q-scroll-area>
        </q-carousel-slide>
      <!-- CAROUSEL SCREEN 2 -->
        <q-carousel-slide name="tv" class="text-center">
          <q-scroll-area class="fit">
            <q-icon class="q-pt-lg" name="terrain" size="36px" />
            <div class="q-mt-md text-center overflow-auto">
              {{ lorem }}
            </div>
          </q-scroll-area>
        </q-carousel-slide>
      <!-- CAROUSEL SCREEN 3 -->  
        <q-carousel-slide name="map" class="text-center">
          <q-scroll-area class="fit">
            <q-icon class="q-pt-lg" name="snowboarding" size="36px" />
            <div class="q-mt-md text-center">
              {{ lorem }}
            </div>
          </q-scroll-area>
        </q-carousel-slide>
     
      </q-carousel>
    <div class="flex justify-center">
      <q-date class="full-width" v-model="date" :options="optionsFn" minimal />
    </div>
</q-page>
</template>

<script>
import { date } from "quasar";
// import CountryFlag from 'vue-country-flag'

export default {
 name: "MyProfile",
  data: () => ({
    loading1: false,
    tab: "places",
    slide: 'style',
    lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemoLorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
    left: true,
    date: ""
  }),
  // components: {
  //   CountryFlag
  // },
  watch: {
    vertical (val) {
      this.navPos = val === true
        ? 'right'
        : 'bottom'
    }
  },

  methods: {
    simulateProgress (number) {
      // we set loading state
      this[`loading${number}`] = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false
      }, 3000)
    },
    optionsFn(validDate) {
      // returns true or false for every date in the month
      if (this.$store.state.guideSelf.unavailableDates.includes(validDate)) {
        return false;
      } else if (validDate >= date.formatDate(Date.now(), "YYYY/MM/DD")) {
        return true;
      } else {
        return false;
      }
    },

    editProfile() {
      this.$store.state.currentView = "EditProfile";
    }
  },
};
</script>

<style scoped>

</style>
