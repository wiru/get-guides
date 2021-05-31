<template>
    <div id="search">
        <div class="q-pa-md">
            <div class="q-gutter-y-md column" style="max-width: 300px">

            <q-input filled bottom-slots v-model="text" label="Label" counter maxlength="12" :dense="dense">
                <template v-slot:before>
                <q-icon name="flight_takeoff" />
                </template>

                <template v-slot:append>
                <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
                <q-icon name="search" />
                </template>

                <template v-slot:hint>
                Field hint
                </template>
            </q-input>
            <q-input filled bottom-slots v-model="text" label="Label" counter maxlength="12" :dense="dense">
                <template v-slot:before>
                <q-icon name="event" />
                </template>

                <template v-slot:hint>
                Field hint
                </template>

                <template v-slot:append>
                <q-btn round dense flat icon="add" />
                </template>
            </q-input>
            </div>
         </div>
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