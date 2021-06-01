<template>
    <div id="search">
        <div class="q-pa-md">
            <div class="q-gutter-y-md column" style="width: 60vw">
                <q-input filled bottom-slots v-model="location" label="Select location">
                    <template v-slot:before>
                        <q-btn icon="my_location" round color="primary" />
                    </template>

                    <template v-slot:append>
                    <q-icon v-if="location !== ''" name="close" @click="location = ''" class="cursor-pointer" />
                    </template>
                </q-input>
            
                <q-input filled bottom-slots v-model="location" label="Select language">
                    <template v-slot:before>
                        <q-btn icon="language" round color="primary" />
                    </template>

                    <template v-slot:append>
                    <q-icon v-if="location !== ''" name="close" @click="location = ''" class="cursor-pointer" />
                    </template>
                </q-input>

                <q-input filled bottom-slots v-model="startDate" label="Select start date">
                    <template v-slot:before>
                        <q-btn icon="today" round color="primary">
                            <q-popup-proxy @before-show="startDate" transition-show="scale" transition-hide="scale">
                            <q-date
                                v-model="startDate"
                                title="Start Date"
                                subtitle="Select the first day"
                            />
                            </q-popup-proxy>
                        </q-btn>
                    </template>

                    <template v-slot:append>
                        <q-icon v-if="startDate !== ''" name="close" @click="startDate = ''" class="cursor-pointer" />
                    </template>
                </q-input>
                
                <q-input filled bottom-slots v-model="endDate" label="Select end date">
                    <template v-slot:before>
                        <q-btn icon="event" round color="primary">
                            <q-popup-proxy @before-show="endDate" transition-show="scale" transition-hide="scale">
                                <q-date
                                    v-model="endDate"
                                    title="End Date"
                                    subtitle="Select the last day"
                                />
                            </q-popup-proxy>
                        </q-btn>
                    </template>

                    <template v-slot:append>
                        <q-icon v-if="language !== ''" name="close" @click="language = ''" class="cursor-pointer" />
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

        language: "",

        startDate: "",
        
        endDate: "",
        
    }),

  methods: {

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