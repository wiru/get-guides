<template>
  <div id="Login">
    <h1>Welcome to Get Guides!</h1>
    <span>Please log in to continue.</span>
    <br />
    <br />
    <button @click="loginAction">LOGIN</button>
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
    } else if (payload.path === "SelectedProfile") {
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
