<template>
  <div id="my-profile" :key="this.$store.state.somethingStupid">
    <div id="top">
      <div id="guide-data" class="absolute-top-left">
        <p>Name: {{ this.$store.state.singleGuide.name }}</p>
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
      </div>
    </div>
    <div id="mid">
      <div id="bio">
        <p>More about me:</p>
        <p></p>
        <p>{{ this.$store.state.singleGuide.bio }}</p>
      </div>
    </div>
    <div id="bot">
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <q-date v-model="date" :options="optionsFn" minimal />
          <q-btn
            id="chat-btn"
            color="red"
            icon="chat"
            label="Request a booking"
            @click="startChat()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
import axios from "axios";
import serverLink from "../serverLink";

export default {
  name: "SelectedProfile",
  data: () => ({
    left: true,
    date: ""
  }),

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

<style scoped>
#avatar {
  margin-top: 1vh;
  margin-right: 1.25vw;
}

#chat-btn {
  margin-right: 10px;
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

/* { "traveller": "", "guide": "", "location": "", "date": "", } */
