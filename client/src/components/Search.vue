<template>
  <q-page class="flex column full-width full-height">
    
    <q-img src="../assets/fuji.jpg" class="flex col-1" style="height: 150px">
    </q-img>

    <div class="q-pa-lg flex flex-center col">
  
    <!-- CARD TITLE -->
    <q-card class="q-pa-lg my-card full-width">
      <div class="q-pb-md">
        <span class="text-h6 q-py-lg">
          Enter search criteria
        </span>
      </div>	

    <!-- LOCATION SEARCH -->
      <q-input color="primary" bg-color="grey-3" outlined bottom-slots v-model="location" label="Select location">
        <template v-slot:before>
          <q-btn icon="my_location" round color="primary" />
        </template>

          <template v-slot:append>
            <q-icon
              v-if="location !== ''"
              name="close"
              @click="location = ''"
              class="cursor-pointer"
            />
          </template>
      </q-input>

    <!-- LANGUAGE SEARCH -->
      <q-input color="primary" bg-color="grey-3" outlined bottom-slots v-model="language" label="Select language">
        <template v-slot:before>
          <q-btn icon="language" round color="primary" />
        </template>

        <template v-slot:append>
          <q-icon
            v-if="language !== ''"
            name="close"
            @click="language = ''"
            class="cursor-pointer"
          />
        </template>
      </q-input>

    <!-- DATE SEARCH -->
        <q-input color="primary" bg-color="grey-3" outlined bottom-slots v-model="date" label="Select date">
          <template v-slot:before>
            <q-btn icon="today" round color="primary">
              <q-popup-proxy
                ref="datePicker"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  @input="() => $refs.datePicker.hide()"
                  v-model="date"
                  title="Start Date"
                  subtitle="Select the first day"
                />
              </q-popup-proxy>
            </q-btn>
          </template>

          <template v-slot:append>
            <q-icon
              v-if="date !== ''"
              name="close"
              @click="date = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <q-btn 
          size="2vh"
          class="full-width q-px-xl q-py-xs"
          color="primary"
          label="Search"
          @click="search"
        />
    </q-card>
    
</div>
  </q-page>
</template>

<script>
export default {
  name: "Search",

  data: () => ({
    location: "",

    language: "",

    date: "",
  }),

  methods: {
    search() {
      let newDate = this.date.split("/").join("");
      console.log(`New Date is: ${newDate}`);

      this.$store.dispatch("getFilteredGuides", {
        location: this.location.toLowerCase(),
        language: this.language.toLowerCase(),
        date: newDate,
        // => remove last parameter from app.py getFilteredGuides endpoint
        nextPage: "SearchResults"
      });
    }
  }
};
</script>

<style>

</style>