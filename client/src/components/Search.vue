<template>
    <div id="search">
        <div class="q-pa-md">
            <div class="q-gutter-y-md column" style="width: 60vw">
            
                <q-input filled bottom-slots v-model="location" label="Select location" :dense="dense">
                    <template v-slot:before>
                        <q-btn icon="my_location" round color="primary" />
                    </template>

                    <template v-slot:append>
                    <q-icon v-if="location !== ''" name="close" @click="location = ''" class="cursor-pointer" />
                    </template>
                </q-input>
            
                <q-input filled bottom-slots v-model="date.from" label="Select date or range" :dense="dense">
                    <template v-slot:before>
                        <q-btn icon="event" round color="primary">
                            <q-popup-proxy @before-show="updateDate" transition-show="scale" transition-hide="scale">
                                <q-date v-model="dateRange" range>
                                    <div class="row items-center justify-end q-gutter-sm">
                                        <q-btn label="Cancel" color="primary" flat v-close-popup />
                                        <q-btn label="OK" color="primary" flat @click="saveDate" v-close-popup />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-btn>
                    </template>

                    <template v-slot:append>
                        <q-icon v-if="date !== ''" name="close" @click="date = ''" class="cursor-pointer" />
                    </template>
                </q-input>

                    <q-btn
                        size="2vh"
                        class="q-px-xl q-py-xs"
                        color="primary"
                        label="Search Guides"
                        @click="search"
                    />

            </div>
         </div>
    </div>
</template>

<script>
export default {
    name: 'Search',

    data: () => ({

        location: "",

        date: "",

        dateRange: {
            from: '2021/06/01',
            to: '2021/06/07'
            },
    }),

  methods: {

    updateDate() {
      this.dateRange = this.date
    },

    saveDate() {
      this.date = this.dateRange
    },

    search(searchCriteria) {
        this.$store.dispatch("search", searchCriteria)
    },

  }
}
</script>

<style scoped>
h1 {
    color: hotpink;
}
</style>