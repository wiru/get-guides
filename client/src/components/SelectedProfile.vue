<template>
  <div id="my-profile" :key="this.$store.state.somethingStupid">
    <div id="top">
      <div id="guide-data" class="absolute-top-left">
        <p>Name: {{ this.$store.state.singleGuide.name }}</p>
        <!-- <p>Location: {{ this.$store.state.singleGuide.location }}</p> -->
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
      </div>
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
    <div id="mid">
      <div id="bio">
        <p>More about me:</p>
        <p></p>
        <p>{{ this.$store.state.singleGuide.bio }}</p>
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
  </div>
</template>

<script>
import { date } from "quasar";

export default {
  name: "SelectedProfile",
  data: () => ({
    left: true,
    date: ""
  }),

  methods: {
    optionsFn(validDate) {
      validDate = validDate >= date.formatDate(Date.now(), "YYYY/MM/DD");
      // returns true or false for every date in the month
      console.log(this.$store.state.singleGuide.unavailableDates);
      console.log("Date Boolean", validDate);
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

<style scoped>
#avatar {
  margin-top: 1vh;
  margin-right: 1.25vw;
}

#chat-btn {
  margin-top: 30px;
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
