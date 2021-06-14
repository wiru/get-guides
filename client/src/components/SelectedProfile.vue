<template>
<q-page class="q-pa-md full-width">
  <div class="flex row q-mb-sm">
    <q-card class="my-card col-8    ">
      <q-card-section class="teal-8">
        <div class="text-h6 text-teal-7">{{this.$store.state.singleGuide.name}}</div>
        <div class="text-subtitle2 text-teal-7">Professional Guide</div>
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
          v-for="location in this.$store.state.singleGuide.locations"
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
          v-for="language in this.$store.state.singleGuide.languages"
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
      <q-img class="q-mb-sm col full-width rounded-borders" v-bind:src="this.$store.state.singleGuide.avatar" />
      <q-btn class="full-width" :loading="loading1" color="primary" @click="simulateProgress(1); editProfile()" label="Chat" />
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
              {{ this.$store.state.singleGuide.bio }}
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
    <q-card class="flex justify-start">
      <span class="q-pa-md text-h6 text-teal-6">
        Select a date
        <q-icon name="touch_app" size="36px"></q-icon>
      </span>
      <q-date class="full-width" v-model="date" :options="optionsFn" minimal />
    </q-card>
</q-page>
</template>

<script>
import { date } from "quasar";
import axios from "axios";
import serverLink from "../serverLink";

export default {
  name: "SelectedProfile",
  data: () => ({
    loading1: false,
    tab: "places",
    slide: 'style',
    lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
    left: true,
    date: ""
  }),
  watch: {
    vertical (val) {
      this.navPos = val === true
        ? 'right'
        : 'bottom'
    }
  },
  methods: {
    optionsFn(validDate) {
      // returns true or false for every date in the month
      if (this.$store.state.singleGuide.unavailableDates.includes(validDate)) {
        return false;
      } else if (validDate >= date.formatDate(Date.now(), "YYYY/MM/DD")) {
        return true;
      } else {
        return false;
      }
    },
    async startChat() {
      let bookingBody = {
        traveller: this.$store.state.id,
        guide: this.$store.state.singleGuide.id,
        location: this.$store.state.searchQuery.location,
        date: this.date,
        start_time: "",
        end_time: "",
        meeting_location: "",
        details: "",
        status: "pending",
        conversation: "",
        price: "",
        currency: "",
        type: "free"
      };
      const newConvoId = (
        await axios.post(`${serverLink}/api/bookings`, bookingBody)
      ).data;

      this.$store.commit("setCurrentChat", newConvoId);

      const payload = {
        id: newConvoId,
        nextPage: "Messages"
      }
      this.$store.dispatch("getChatLog", payload);
      console.log(newConvo);
      // id = this.$store.state.singleGuide.id
      // this.$store.dispatch("getChatLogs", id);
    }
  },
  mounted() {
    this.date = this.$store.state.searchQuery.date;
  }
};
</script>

<style lang="sass" scoped>

.my-card
  width: 100%
  max-width: 250px

</style>
