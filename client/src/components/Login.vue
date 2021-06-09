<template>
  <div class="fullscreen bg-teal-2 text-white text-center q-pa-md flex flex-center">
    <div v-if="$q.platform.is.desktop">
      I'm only rendered on desktop!
    </div>

    <div class="fullscreen column" v-if="$q.platform.is.mobile">
      <div class="col">
        <q-img
          src="../assets/GG-white-red.png"
        />
      </div>
      <div class="col-1">
        <q-btn @click="loginAction" style="width: 150px" :loading="loading2" color="red">
          Login
          <template v-slot:loading>
            Loading...
          </template>
        </q-btn>
      </div>
      <div class="col-1">
        <p @click="loginAction" class="self-center">Register</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  methods: {
    loginAction() {
      window.location.replace(`${window.location.origin}/login`);
    }
  },
  async created() {
    const payload = (await axios.get(`${window.location.origin}/auth`)).data;
    if (payload.path === "Search") {
      this.$store.commit("setUserId", payload.id);
      this.$store.commit("setUserType", "traveller");
      this.$store.commit("changeView", payload.path);
      this.$store.commit("loggedIn", payload.loggedIn);
    } else if (payload.path === "MyProfile") {
      this.$store.commit("setUserId", payload.id);
      this.$store.commit("setUserType", "guide");
      this.$store.commit("changeView", payload.path);
      this.$store.commit("loggedIn", payload.loggedIn);
    } else if (payload.path === "Registration") {
      this.$store.commit("setUserName", payload.name);
      this.$store.commit("setUserEmail", payload.email);
      this.$store.commit("setUsergid", payload.gid);
      this.$store.commit("changeView", payload.path);
    }
  }
};
</script>

<style scoped>
h1 {
  color: rgb(226, 74, 47);
  font-size: 34pt;
}
</style>
