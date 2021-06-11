<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div v-if="$q.platform.is.desktop">
      I'm only rendered on desktop!
    </div>

    <div class="fullscreen column items-center justify-center" v-if="$q.platform.is.mobile">
      <div class="flex col" style="align-items: center">
          <q-img style="width: 300px" class="q-mb-xl"
            src="../assets/GG-white-red.png"
          />
      </div>
      <div class="col-1">
        <q-btn @click="loginAction" class="text-h6 q-ma-md" style="width: 200px" :loading="loading2" color="red">
          Login
          <template v-slot:loading>
            Loading...
          </template>
        </q-btn>
        <q-btn @click="loginFront" class="text-h6 q-ma-md" style="width: 200px" :loading="loading2" color="red">
          Login8080
          <template v-slot:loading>
            Loading...
          </template>
        </q-btn>
      </div>
      <div class="col-1 q-mb-xl q-mt-sm">
        <p @click="loginAction" class="text-h6 q-ma-md text-primary self-center">Register</p>
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
    },
    loginFront() {
      this.$store.commit("setUserId", "60b47b595c7aa6b557654a30"); // Change here ID
      this.$store.commit("setUserType", "guide"); // Change here for traveller
      this.$store.commit("changeView", "MyProfile"); // Change to search for traveller
      this.$store.commit("loggedIn", true);
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
