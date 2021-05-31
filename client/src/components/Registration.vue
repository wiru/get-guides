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
        <q-select outlined v-model="usermodel" :options="usertype" :dense="dense" />
            <div id="travelreg" v-if="(usermodel === 'Traveler')">
                <br/>
                <span>You're all set! Please confirm to finish the registration.</span>
                <br/>
                <q-btn id="travelconfirm" color="primary" label="Finish" />
            </div>
            <div id="guidereg" v-if="(usermodel === 'Guide')">
                <br/>          
                <q-input filled v-model="biomodel" type="string" maxlength=160 placeholder="Please write a short bio about yourself!" hint="max 160 characters" :dense="dense" />
                <br/>
                <q-select filled v-model="languagemodel" multiple :options="languages" label="Languages"  hint="Multiple Options" />
                <br/>
                <q-select filled v-model="availabledaysmodel" multiple :options="availabledays" label="Available Days"  hint="Multiple Options" />
                <br/>
                <q-input filled v-model="ratemodel" type="number" placeholder="Approx. Rate" hint="in JPY, per hour" :dense="dense" />
                <br/>
                <span>You're all set! Please confirm to finish the registration.</span>
                <br/>
                <q-btn id="guideconfirm" color="primary" label="Finish" />
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
            usermodel: null,
            languagemodel: null,
            availabledaysmodel: null,
            ratemodel: null,
            biomodel: null,
            usertype: ['Traveler', 'Guide'],
            languages: ['English', 'Japanese', 'Italian'],
            availabledays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
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