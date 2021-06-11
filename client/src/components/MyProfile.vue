<template>
  <div id="my-profile">
    <div id="top">
      <div id="guide-data" class="absolute-top-left">
        <p>Name: {{ this.$store.state.guideSelf.name }}</p>
        <!-- <p>Location: {{ this.$store.state.guideSelf.location }}</p> -->
        <p class="pre-chip">I can guide you in:</p>
        <q-chip
          v-for="location in this.$store.state.guideSelf.locations"
          :key="location.fakeValueThatIMadeUp"
          clickable
          color="primary"
          text-color="white"
        >
          {{ location }}
        </q-chip>
        <p class="pre-chip">I can speak:</p>
        <q-chip
          v-for="language in this.$store.state.guideSelf.languages"
          :key="language.fakeValueThatIMadeUp"
          clickable
          color="primary"
          text-color="white"
        >
          {{ language }}
        </q-chip>
      </div>
      <div id="avatar-container" class="q-pa-md q-gutter-sm">
        <q-avatar id="avatar" rounded size="25vw" class="absolute-top-right">
          <img v-bind:src="this.$store.state.guideSelf.avatar" />
        </q-avatar>
        <q-btn
          id="edit-btn"
          class="absolute-top-right"
          color="deep-orange"
          icon="edit"
          @click="editProfile"
        />
      </div>
    </div>
    <div id="mid">
      <div id="bio">
        <p>More about me:</p>
        <p></p>
        <p>{{ this.$store.state.guideSelf.bio }}</p>
      </div>
    </div>
    <div id="bot">
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <q-date v-model="date" :options="optionsFn" minimal />
        </div>
      </div>
    </div>
  </div>
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
#avatar {
  margin-top: 1vh;
  margin-right: 1.25vw;
}

#edit-btn {
  margin-top: 14.5vh;
  margin-right: 1vh;
  width: 25vw;
}

#guide-data {
  margin-top: 1vh;
  margin-left: 3vw;
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
