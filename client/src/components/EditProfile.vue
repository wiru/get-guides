<template>
    <div id="editprofile">
        <h1> Edit own profile </h1>
        <br/>
        <span>Please update the necessary fields to finish the editing process.</span>
        <br/>
        <q-select disable filled v-model="username" :username="username" />
        <!-- <q-select disable filled v-model="emailaddress" :emailaddress="emailaddress" /> -->
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
            console.log(this.usermodel, this.username, this.locationmodel, this.languagemodel, this.availabledaysmodel, this.ratemodel, this.biomodel)
            if (this.usermodel !== null && this.username !== "" && this.locationmodel !== null && this.languagemodel !== null && this.availabledaysmodel !== null && this.ratemodel !== null && this.biomodel !== null) {
            
            let guidePackageUpdate = {}
            guidePackageUpdate["usertype"] = this.usermodel
            guidePackageUpdate["username"] = this.username
            //guidePackageUpdate["email"] = this.emailaddress
            guidePackageUpdate["location"] = this.locationmodel
            guidePackageUpdate["language"] = this.languagemodel
            guidePackageUpdate["availabledays"] = this.availabledaysmodel
            guidePackageUpdate["rate"] = this.ratemodel
            guidePackageUpdate["bio"] = this.biomodel
            //guidePackageUpdate["gid"] = this.$store.state.gid
            guidePackageUpdate["id"] =this.$store.state.id

            //console.log(guidePackageUpdate)
            this.$store.commit("setGuidePackageUpdate", guidePackageUpdate)
            this.$store.dispatch('guidePackageUpdate', guidePackageUpdate)
            this.$store.commit("changeView", "MyProfile")
            }
            else {this.alert = true}
        }
    },
    mounted() {
    },
    data () {
        return {
            usermodel: "guide",
            locationmodel: this.$store.state.guideSelf.locations,
            languagemodel: this.$store.state.guideSelf.languages,
            availabledaysmodel: this.$store.state.guideSelf.weekdays,
            ratemodel: this.$store.state.guideSelf.rate,
            biomodel: this.$store.state.guideSelf.bio,
            usertype: ['traveller', 'guide'],
            location: ['nikko', 'tokyo', 'osaka'],
            languages: ['english', 'japanese', 'italian'],
            availabledays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
            username: this.$store.state.guideSelf.name,
            //emailaddress: this.$store.state.email,
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