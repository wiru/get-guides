<template>
  <div id="my-profile" :key="this.$store.state.somethingStupid">
    <div id="top">
      <div id="guide-data" class="fixed-top-left">
        <p>Name: {{ this.$store.state.singleGuide.name }}</p>
        <!-- <p>Location: {{ this.$store.state.singleGuide.location }}</p> -->
        <p>I can guide you in:</p>
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
      <div id="avatar" class="q-pa-md q-gutter-sm fixed-top-right">
        <q-avatar rounded size="25vw">
          <img v-bind:src="this.$store.state.singleGuide.avatar" />
        </q-avatar>
      </div>
    </div>
    <div id="mid">
      <div id="bio">
        <p>{{ this.$store.state.singleGuide.bio }}</p>
      </div>
    </div>
    <div id="bot">
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <q-date v-model="date" :options="optionsFn" minimal />
          <q-btn
            color="deep-orange"
            icon="chat"
            @click="startChat(singleGuide.id)"
          />
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
      return validDate >= date.formatDate(Date.now(), "YYYY/MM/DD");
    },
    // optionsFn(date) {
    //   const parts = date.split("/");
    //   return parts[2] % 2 === 0;
    // },
    startChat(id) {
      this.$store.state.currentView = "Messages";
      this.$store.dispatch("getChatLogs", id);
    }
  }
};
</script>

<style scoped>
#avatar {
  margin-top: 5vh;
}

#guide-data {
  margin-top: 8vh;
  margin-left: 3vw;
}

textarea {
  font-size: 3vh;
}

#bio {
  padding: 10px;
  margin-top: 25vh;
}
</style>
