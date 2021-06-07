<template>
    <div id="editprofile">
        <h1> Edit own profile </h1>
        <br/>
        <span>Please update the necessary fields in the following fields to finish the editing process.</span>
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
                     Please edit all necessary information.
                    </q-card-section>

                    <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>
            <div id="guidereg" >
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
                <span>Please confirm to finish the editing process.</span>
                <br/>
                <q-btn id="guideconfirm" @click="editGuide" color="primary" label="Finish" />
            </div>
    </div>
</template>

<script>
export default {
    name: 'EditProfile',
	methods: {
        editGuide () {
            if (this.usermodel !== null && this.username !== "" && this.emailaddress !== "" && this.locationmodel !== null && this.languagemodel !== null && this.availabledaysmodel !== null && this.ratemodel !== null && this.biomodel !== null && this.$store.state.gid !== "") {
            
             let guidePackage = {}
            guidePackage["usertype"] = this.usermodel
            guidePackage["username"] = this.username
            guidePackage["email"] = this.emailaddress
            guidePackage["location"] = this.locationmodel
            guidePackage["language"] = this.languagemodel
            guidePackage["availabledays"] = this.availabledaysmodel
            guidePackage["rate"] = this.ratemodel
            guidePackage["bio"] = this.biomodel
            guidePackage["gid"] = this.$store.state.gid
            //console.log(guidePackage)
            //this.$store.commit("setGuidePackage", guidePackage)
            //this.$store.dispatch('guidePackage', guidePackage)
            this.$store.commit("changeView", "MyProfile")
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
            usertype: ['traveller', 'guide'],
            location: ['nikko', 'tokyo', 'osaka'],
            languages: ['english', 'japanese', 'italian'],
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