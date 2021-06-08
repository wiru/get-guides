<template>
  <div id="Login">
    <div v-if="$q.platform.is.desktop">
      I'm only rendered on desktop!
    </div>

    <div v-if="$q.platform.is.mobile">
      <h1>Welcome to Get Guides!</h1>
      <span>Please log in to continue.</span>
      <br />
      <br />
      <button @click="loginAction">LOGIN</button>
      <button @click="loginFront">LOGIN:8080</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import serverLink from "../serverLink";
export default {
  name: "Login",
  methods: {
    loginAction() {
      window.location.replace(`${serverLink}/login`);
    },
    loginFront() {
      this.$store.commit("setUserId", "60b98f9d1b2a8142eec9753e");
      this.$store.commit("setUserType", "traveller");
      this.$store.commit("changeView", "Search");
      this.$store.commit("loggedIn", true);
    }
  },
  async created() {
    const payload = (await axios.get(`${serverLink}/auth`)).data;
    if (payload) {
      if (payload.path === "Registration") {
        this.$store.commit("setUserName", payload.name);
        this.$store.commit("setUserEmail", payload.email);
        this.$store.commit("setUsergid", payload.gid);
        this.$store.commit("changeView", payload.path);
      } else {
        this.$store.commit("setUserId", payload.id);
        this.$store.commit("setUserType", payload.userType);
        this.$store.commit("changeView", payload.path);
        this.$store.commit("loggedIn", payload.loggedIn);
      }
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
