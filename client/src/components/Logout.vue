<template>
  <div id="Logout">
    <h1>Logging out...</h1>
  </div>
</template>

<script>
import serverLink from "../serverLink";
export default {
  name: "Logout",
  created() {
    window.location.replace(`${serverLink}/logout`);
  }
};
</script>

<style scoped>
</style>
