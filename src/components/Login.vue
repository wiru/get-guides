<template>
    <div id="Login">
        <h1> I'm a Login page. We have no idea whats gonna go on here yet. </h1>
        <button @click="doStuff">L O G I N</button>
    </div>
</template>

<script>
export default {
    name: 'Login',
	methods: {
        doStuff(userType) {
            this.$store.commit("setUserType", userType)
            this.$store.commit("changeView", "Search")
        },

    },
}
</script>

<style scoped>
h1 {
    color: hotpink;
}
</style>