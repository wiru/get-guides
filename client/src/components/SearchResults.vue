<template>
  <q-page class="flex column full-width">

      <q-list bordered>
        <q-item
          :key="guide.id"
          v-for="guide in this.$store.state.filteredGuides"
          clickable
          v-ripple
          @click="getSingleGuide(guide._id)"
        >
        <!-- GUIDES NAME AND PIC -->
          <q-card class="flex column no-wrap full-width">
            
            <q-card-section class="flex row no-wrap">
              <div class="flex column col-9">
                <span class="text-h6 ellipsis">
                  {{ guide.name }}
                </span>
                <span class="text-subtitle2 ellipsis">
                  Volunteer Guide
                </span>
                    <q-rating
                      v-model="model"
                      size="2rem"
                      max="5"
                      color="yellow"
                      icon="star_border"
                      icon-selected="star"
                      icon-half="star_half"
                      no-dimming
                    />
              </div>
            
              <q-img class="col rounded-borders" style="min-height:80px; max-height:90px" v-bind:src="guide.avatar" />
            
            </q-card-section>

          <!-- GUIDE BIO -->
              <q-card-section>
              <span>
                {{ guide.bio }}  
              </span>
            </q-card-section>
          </q-card>

        </q-item>
      </q-list>

  </q-page>
</template>

<script>
export default {
  name: "SearchResults",

  data: () => ({}),

  methods: {
    getSingleGuide(id) {
      const payload = {
        id: id,
        nextPage: "SelectedProfile"
      }
      this.$store.dispatch("getSingleGuide", payload);
    }
  }
};
</script>

<style scoped></style>
