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
  <!-- <div id="my-profile" :key="this.$store.state.somethingStupid">
      <q-card dark bordered class="bg-grey-9 my-card">
        <q-card-section>
          <div class="text-h6">I can guide you in</div>
        <q-separator dark inset />
          <q-chip
            v-for="location in this.$store.state.singleGuide.locations"
            :key="location.fakeValueThatIMadeUp"
            clickable
            color="primary"
            text-color="white"
          >
            {{ location }}
          </q-chip>
        </q-card-section>


        <q-card-section>
          BALLS
        </q-card-section>
      </q-card>

        <p>Location: {{ this.$store.state.singleGuide.location }}</p>
        <p class="pre-chip">I can guide ya in:</p>
        <q-chip
          v-for="location in this.$store.state.singleGuide.locations"
          :key="location.fakeValueThatIMadeUp"
          clickable
          color="primary"
          text-color="white"
        >
          {{ location }}
        </q-chip>
        <p class="pre-chip">I can speak:</p>
        <q-chip
          v-for="language in this.$store.state.singleGuide.languages"
          :key="language.fakeValueThatIMadeUp"
          clickable
          color="primary"
          text-color="white"
        >
          {{ language }}
        </q-chip>
      <div id="avatar-container" class="q-pa-md q-gutter-sm">
        <q-avatar id="avatar" rounded size="25vw" class="absolute-top-right">
          <img v-bind:src="this.$store.state.singleGuide.avatar" />
        </q-avatar>
        <q-btn
          id="chat-btn"
          class="absolute-top-right"
          color="deep-orange"
          icon="chat"
          @click="startChat(singleGuide.id)"
        />
      </div>





        </div>
  </div> -->
</template>

<script>
import { date } from "quasar";

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
      validDate = validDate >= date.formatDate(Date.now(), "YYYY/MM/DD");
      // returns true or false for every date in the month
      console.log(validDate);
      return validDate;
    },
    // optionsFn(date) {
    //   const parts = date.split("/");
    //   return parts[2] % 2 === 0;
    // },
    startChat(id) {
      this.$store.dispatch("getChatLogs", id);
    }
  }
};
</script>

<style lang="sass" scoped>

.my-card
  width: 100%
  max-width: 250px

</style>

