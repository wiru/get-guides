<template>
  <div id="search-results">
    <div class="q-pa-md" style="width: 100vw">
      <q-list bordered>
        <q-item
          :key="guide.id"
          v-for="guide in this.$store.state.filteredGuides"
          clickable
          v-ripple
          @click="getSingleGuide(guide._id)"
        >
          <q-item-section>{{ guide.name }}</q-item-section>
          <q-item-section avatar>
            <q-avatar>
              <img v-bind:src="guide.avatar" />
            </q-avatar>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResults",

  data: () => ({}),

  methods: {
    getSingleGuide(id) {
      this.$store.dispatch("getSingleGuide", id);
    }
  }
};
</script>

<style scoped></style>
