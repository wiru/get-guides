<template>
<q-page>
  <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="Tab one" name="one" />
        <q-tab label="Tab two" name="two" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          The QCard component is a great way to display important pieces of grouped content.
        </q-tab-panel>

        <q-tab-panel name="two">
          With so much content to display at once, and often so little screen real-estate,
          Cards have fast become the design pattern of choice for many companies, including
          the likes of Google and Twitter.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

<q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders"
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

<q-carousel
        v-model="slide"
        swipeable
        animated
        :padding="padding"
        :vertical="vertical"
        :arrows="arrows"
        :navigation="navigation"
        :navigation-position="navPos"
        height="300px"
        class="bg-purple text-white rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            HELLO
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            HELLO
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            HELLO
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            HELLO
          </div>
        </q-carousel-slide>
      </q-carousel>




        <h9>More about me:</h9>
        <p></p>
        <p>{{ this.$store.state.singleGuide.bio }}</p>
        <h9>I'm unavailable:</h9>
        <p></p>
        <p>{{ this.$store.state.singleGuide.unavailableDates }}</p>
        <div class="q-gutter-md">
          <q-date v-model="date" :options="optionsFn" minimal />
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

