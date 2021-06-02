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
          <q-date v-model="date" :options="optionsFn2" minimal />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyProfile",
  data: () => ({
    left: true,
    date: ""
  }),

  methods: {
    optionsFn2(date) {
      const parts = date.split("/");
      return parts[2] % 2 === 0;
    }
  },
  created() {
    console.log("call start", Date.now());
    this.$store.dispatch("getSingleGuide");
    this.avatar = this.$store.state.singleGuide.avatar;
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
