<template>
    <div id="search">
        <h1> I'm a search page </h1>
    </div>
</template>

<script>
export default {
    name: 'Search',
    // This is regular vue. Kinda replaced as we're using Vuex and the store. 
	// data() => ({

	// }),
	methods: {

    },
	// Before mounted. As function. 
    created() {
        this.$store.commit("someOtherFunction");
    },
	// On load. DO the following. Commit is for sync methods in store. 
    mounted() {
        this.$store.commit("someFunction");
    },
	// As a key. Happens when running through the code on this page. After mounted. We think. Have to return something. 
    computed: {
        someFunction() {
           return console.log("Something");
        }
    }
}
</script>

<style scoped>
h1 {
    color: hotpink;
}
</style>