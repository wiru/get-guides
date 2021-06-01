<template>
  <div id="Login">
    <h1>Welcome to GetGuides!</h1>
    <span
      >Please register a new account below or log into your existing one.</span
    >
    <br />
    <button @click="registerAction">Register new User</button>
    <br />
    <button @click="loginAction">LOGIN</button>
  </div>
</template>

<script>
export default {
    name: 'Login',
	methods: {
        registerAction() {
            this.$store.commit("changeView", "Registration")
        },

        loginAction() {
            this.$store.dispatch("login")
        },

    },

    loginAction(userType) {
      this.$store.commit("setUserType", userType);
      this.$store.commit("changeView", "Search");
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
