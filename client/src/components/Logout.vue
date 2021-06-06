<template>
  <div id="Logout">
    <h1>Logging out...</h1>
  </div>
</template>

<script>
export default {
  name: "Logout",
  created() {
    window.location.replace(`${window.location.origin}/logout`);
  }
};
</script>

<style scoped>
h1 {
  color: hotpink;
  font-size: 34pt;
}
</style>
