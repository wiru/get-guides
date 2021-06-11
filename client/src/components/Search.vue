<template>
  <div id="search">
    <q-card class="q-ma-sm q-pa-lg my-card col-9">
    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="width: 60vw">
        <q-input filled bottom-slots v-model="location" label="Select location">
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

        <q-input filled bottom-slots v-model="language" label="Select language">
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

        <q-input filled bottom-slots v-model="date" label="Select date">
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
          class="q-px-xl q-py-xs"
          color="primary"
          label="Search"
          @click="search"
        />
      </div>
    </div>
    </q-card>
  </div>
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
        // To-Do remove meme:
        // => remove last parameter from app.py getFilteredGuides endpoint
        meme: "69420",
        nextPage: "SearchResults"
      });
    }
  }
};
</script>