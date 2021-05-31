<template>
  <q-page class="flex full-width">
    <q-list class="full-width" separator bordered>
      <q-item v-for="user in users" 
      :key="user.id" 
      class="q-my-sm" 
      clickable 
      @click="goToMessages(user.id)" 
      v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>
        
        <q-item-section side>
          <q-badge 
            :color="user.online ? 'blue' : 'grey-5'">
            {{ user.online ? "online" : "offline" }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
  export default {
    data () {
      return {
        users: [
          {
            id: 1,
            name: 'Craig Charles',
            online: true
          }, 
          {
            id: 2,
            name: 'Chris Barrie',
            online: true
          }, 
          {
            id: 3,
            name: 'Danny John-Jules',
            online: false
          }, 
          {
            id: 4,
            name: 'Robert Llewellyn',
            online: true
          } 
        ]
      }
    },
    methods: {
    goToMessages(id) {
      console.log(id)
      this.$store.commit("selectedChat", id)
      this.$store.commit("changeView", "Messages")
    }
  },
  }
</script>

<style scoped>
h1 {
    color: rgb(105, 255, 125);
}
</style>