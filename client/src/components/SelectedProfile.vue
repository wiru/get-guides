<template>
<q-page>
  <div class="flex row">
  <q-card class="q-ma-sm my-card col-9">
    <q-card-section class="teal-9">
      <div class="text-h6">Will Saville</div>
      <div class="text-subtitle2">Professional Guide</div>
      <!-- <div class="text-subtitle2">by John Doe</div> -->
    </q-card-section>

    <q-tabs v-model="tab" class="text-teal">
      <q-tab label="Places" name="one" />
      <q-tab label="Languages" name="two" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="one">
        <q-chip
          v-for="location in this.$store.state.singleGuide.locations"
          :key="location.fakeValueThatIMadeUp"
          clickable
          square
          text-color="white"
          class="bg-primary"
        >
          {{ location }}
        </q-chip>
      </q-tab-panel>

        <q-tab-panel name="two">
          <q-chip
            v-for="location in this.$store.state.singleGuide.languages"
            :key="location.fakeValueThatIMadeUp"
            clickable
            square  
            class="bg-primary"
            text-color="white"
          >
            {{ location }}
         </q-chip>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div class="q-py-sm q-pr-sm flex justify-center flex-center column col">
      <q-img class="col full-width overflow-hidden rounded-borders" :fit="cover" v-bind:src="this.$store.state.singleGuide.avatar" />
      <q-btn class="q-mt-sm full-width" @click="loginAction" :loading="loading2" color="primary">
        Chat
        <template v-slot:loading>
          Loading...
        </template>
      </q-btn>
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
        class="bg-primary text-white shadow-1"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    <div class="flex justify-center q-pa-md">
      <q-date v-model="date" :options="optionsFn" minimal />
    </div>
</q-page>
</template>

<script>
import { date } from "quasar";
import axios from "axios";
import serverLink from "../serverLink";

export default {
  name: "SelectedProfile",
  data: () => ({
    tab: "one",
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
      const newConvo = (
        await axios.post(`${serverLink}/api/bookings`, bookingBody)
      ).data;
      this.$store.commit("setCurrentChat", newConvo);
      this.$store.dispatch("getChatLog", newConvo);
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
