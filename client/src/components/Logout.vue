<template>
    <div id="Logout">
        <h1> Does this actually need to be a page of its own?</h1>
        <br/>
        <span>Or can the Logout button in the sidebar just make people leave? </span>
        <br/>
        <span>If so, we need to somehow make the (sidebar)button clear the entire cached data, which might be hard. So lets just leave this page for now.</span>
        <br/>
        <button @click="logoutAction">LOGOUT</button>
    </div>
</template>

<script>
export default {
    name: 'Logout',
	methods: {
        logoutAction() {
            this.$store.commit("setUserType", "")
            this.$store.commit("changeView", "Login")
        }
    },
}
</script>

<style scoped>
h1 {
    color: hotpink;
    font-size: 34pt
}
</style>