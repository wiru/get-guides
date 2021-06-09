<template>
<q-page>
  Hello
</q-page>
  <!-- <div id="my-profile" :key="this.$store.state.somethingStupid">
    <div id="top">
        <p>Name: {{ this.$store.state.singleGuide.name }}</p>
        <p>Location: {{ this.$store.state.singleGuide.location }}</p>
        <p class="pre-chip">I can guide you in:</p>
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
          id="edit-btn"
          class="absolute-top-right"
          color="deep-orange"
          icon="edit"
          @click="editProfile"
        />

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

        <p>I'm unavailable:</p>
        <p></p>
        <p>{{ this.$store.state.singleGuide.unavailableDates }}</p>
      </div>
    </div>
    <div id="bot">
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <q-date v-model="date" :options="optionsFn" minimal />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { date } from "quasar";

export default {
  name: "MyProfile",
  data: () => ({
    left: true,
    date: ""
  }),

  methods: {
    optionsFn(validDate) {
      validDate = validDate >= date.formatDate(Date.now(), "YYYY/MM/DD");
      // returns true or false for every date in the month
      return validDate;
    },
    // optionsFn(date) {
    //   const parts = date.split("/");
    //   return parts[2] % 2 === 0;
    // },
    editProfile() {
     this.$store.state.currentView = "EditProfile";
      // this.$store.dispatch("getChatLogs", id);
    }
  },
  created () {
    this.$store.dispatch("getSingleGuide", this.$store.state.id)
  }
};
</script>

<style scoped>
#avatar {
  margin-top: 1vh;
  margin-right: 1.25vw;
}

#edit-btn {
  margin-top: 14.5vh;
  margin-right: 1vh;
  width: 25vw;
}


textarea {
  font-size: 3vh;
}

#bio {
  padding: 10px;
  margin-top: 24vh;
}

.pre-chip {
  margin-bottom: -3px;
}
</style>
