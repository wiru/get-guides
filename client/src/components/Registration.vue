<template>
    <div id="registragion">
        <h1> New user registration </h1>
        <br/>
        <span>Please fill in the following fields to finish the registration process.</span>
        <br/>
        <q-select disable filled v-model="username" :username="username" />
        <q-select disable filled v-model="emailaddress" :emailaddress="emailaddress" />
        <br/>
            <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Alert</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                     Please fill in all necessary information.
                    </q-card-section>

                    <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>

        <span>Please confirm the type of account you would like to create:</span>
        <q-select outlined v-model="usermodel" :options="usertype" label="Account Type" :dense="dense" />
            <div id="travelreg" v-if="(usermodel === 'Traveler')">
                <br/>
                <span>You're all set! Please confirm to finish the registration.</span>
                <br/>
                <q-btn id="travelconfirm" @click="registerTraveler" color="primary" label="Finish" />
            </div>
            <div id="guidereg" v-if="(usermodel === 'Guide')">
                <br/>          
                <q-input filled v-model="biomodel" type="string" maxlength=160 placeholder="Please write a short bio about yourself!" hint="max 160 characters" :dense="dense" />
                <br/>
                <q-select filled v-model="locationmodel" multiple :options="location" label="Location" hint="Multiple Options" :dense="dense" />
                <br/>
                <q-select filled v-model="languagemodel" multiple :options="languages" label="Languages"  hint="Multiple Options" :dense="dense" />
                <br/>
                <q-select filled v-model="availabledaysmodel" multiple :options="availabledays" label="Available Days"  hint="Multiple Options" />
                <br/>
                <q-input filled v-model="ratemodel" type="number" placeholder="Approx. Rate" hint="in JPY, per hour" :dense="dense" />
                <br/>
                <span>You're all set! Please confirm to finish the registration.</span>
                <br/>
                <q-btn id="guideconfirm" @click="registerGuide" color="primary" label="Finish" />
            </div>
    </div>
</template>

<script>
export default {
    name: 'Registration',
	methods: {
        registerTraveler () {
            
            if (this.usermodel !== null && this.username !== "" && this.emailaddress !== "" && this.$store.state.gid !== "") {
            
            let travellerPackage = {}
            travellerPackage["usertype"] = this.usermodel
            travellerPackage["username"] = this.username
            travellerPackage["email"] = this.emailaddress
            travellerPackage["gid"] = this.$store.state.gid
            //console.log(travellerPackage)
            this.$store.commit("setTravellerPackage", travellerPackage)
            this.$store.dispatch('travellerPackage', travellerPackage)
            this.$store.commit("changeView", "Search")
            }
            
            else {this.alert = true}
        },
        registerGuide () {
            if (this.usermodel !== null && this.username !== "" && this.emailaddress !== "" && this.locationmodel !== null && this.languagemodel !== null && this.ratemodel !== null && this.biomodel !== null && this.$store.state.gid !== "") {
            
             let guidePackage = {}
            guidePackage["usertype"] = this.usermodel
            guidePackage["username"] = this.username
            guidePackage["email"] = this.emailaddress
            guidePackage["location"] = this.locationmodel
            guidePackage["language"] = this.languagemodel
            guidePackage["rate"] = this.ratemodel
            guidePackage["bio"] = this.biomodel
            guidePackage["gid"] = this.$store.state.gid
            //console.log(guidePackage)
            this.$store.commit("setGuidePackage", guidePackage)
            this.$store.dispatch('guidePackage', guidePackage)
            this.$store.commit("changeView", "SelectedProfile")
            }
            else {this.alert = true}
        }
    },
    mounted() {
    },
    data () {
        return {
            usermodel: null,
            locationmodel: null,
            languagemodel: null,
            availabledaysmodel: null,
            ratemodel: null,
            biomodel: null,
            usertype: ['Traveler', 'Guide'],
            location: ['Tokyo 23 wards', 'Extended Tokyo', 'Osaka'],
            languages: ['English', 'Japanese', 'Italian'],
            availabledays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
            username: this.$store.state.name,
            emailaddress: this.$store.state.email,
            dense: true,
            alert: false,
            }
    }
}
</script>

<style scoped>
h1 {
    color: black;
    font-size: 34pt
}
</style>