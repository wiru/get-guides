<template>
  <q-item
  clickable
    tag="span"
     @click="changeView(view)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  methods: {
    changeView(view) {

      const payload = {
        id: this.$store.state.id,
        nextPage: view
      }
      this.$store.dispatch("getUser", payload);
    }
  },
  name: 'ProfileLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    view: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
