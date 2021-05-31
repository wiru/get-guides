<template>
    <div id="registragion">
        <h1> New user registration </h1>
        <br/>
        <span>Please fill in the following fields to finish the registration process.</span>
        <br/>
        <q-select
        disable
        filled
        v-model="username"
        :username="username" 
        />
        <q-select
        disable
        filled
        v-model="emailaddress"
        :emailaddress="emailaddress" 
        />
        <br/>
        <span>Please confirm the type of account you would like to create:</span>
        <q-select outlined v-model="model" :options="options" :dense="dense">
        </q-select>
            <div id="travelreg" v-if="(model === 'Traveler')">
            <h2> Traveler Selection </h2>
            </div>
            <div id="guidereg" v-if="(model === 'Guide')">
            <h2> Guide Selection </h2>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Registration',
	methods: {
    },
    mounted() {
    },
    data () {
        return {
            model: null,
            options: [
            'Traveler', 'Guide'
            ],
            username: ["username"],
            emailaddress: ["email address"],
            dense: true,
            }
    }
}
</script>

<style scoped>
h1 {
    color: black;
    font-size: 40pt
}
</style>