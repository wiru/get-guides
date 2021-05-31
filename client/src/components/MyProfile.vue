<template>
    <div id="my-profile">
        <div id='top'>
            <div id='guide-data' class="fixed-top-left">
                <p>Name: {{this.$store.state.userData.name}}</p>
                <p>Email: {{this.$store.state.userData.email}}</p>
                <p>Location: {{this.$store.state.userData.location}}</p>
                <p>Completed tours: {{this.$store.state.userData.completedTours}}</p>
                <p>I can guide you in:</p>
                <q-chip v-for="language in this.$store.state.userData.languages" 
                    :key="language.fakeValueThatIMadeUp" clickable @click="onClick" color="primary" text-color="white">
                    {{ Object.keys(language)[0] }}
                </q-chip>
            </div>
            <div id='avatar' class="q-pa-md q-gutter-sm fixed-top-right">
                <q-avatar rounded size="30vw">
                <img src="https://cdn.quasar.dev/img/avatar.png">
                </q-avatar>
            </div>
        </div>
        <div id='mid'>
            <div id='bio'>
                <p> {{this.$store.state.userData.bio}} </p>
            </div>  
        </div>
        <div id ='bot'>
            <div class="q-pa-md">
                <div class="q-gutter-md">
                <q-date
                    v-model="date"
                    :options="optionsFn2"
                    minimal
                />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyProfile',
    data () {
        return {
            left: true
        }
    },
	methods: {
        optionsFn2 (date) {
            const parts = date.split('/')
            return parts[2] % 2 === 0
        }
    },
    // mounted() {
    //     this.$store.commit("someFunction");
    // },
}
</script>

<style scoped>
#avatar {
    margin-top: 5vh;
}

#guide-data {
    margin-top: 8vh;
    margin-left: 3vw;
}

textarea {
    font-size: 3vh;
}

#bio {
    padding: 10px;
    margin-top: 25vh;
}
</style>