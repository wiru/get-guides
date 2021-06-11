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

        <q-input filled bottom-slots v-model="startDate" label="Select date">
          <template v-slot:before>
            <q-btn icon="today" round color="primary">
              <q-popup-proxy
                ref="datePicker"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  @input="() => $refs.datePicker.hide()"
                  v-model="startDate"
                  title="Start Date"
                  subtitle="Select the first day"
                />
              </q-popup-proxy>
            </q-btn>
          </template>

          <template v-slot:append>
            <q-icon
              v-if="startDate !== ''"
              name="close"
              @click="startDate = ''"
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

    startDate: ""
  }),

  methods: {
    search() {
      const filterGuidesObj = {
        location: this.location.toLowerCase(),
        language: this.language.toLowerCase(),
        date: this.startDate.split("/").join(""),
        meme: "69420"
      };
      const setQueryObj = {
        location: this.location.toLowerCase(),
        language: this.language.toLowerCase(),
        date: this.startDate,
        meme: "69420"
      };
      this.$store.dispatch("getFilteredGuides", filterGuidesObj);
      this.$store.commit("setSearchQuery", setQueryObj);
    }
  }
};
</script>

<style scoped></style>
