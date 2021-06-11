<template>
  <q-page class="flex full-width">
    <q-list class="full-width" bordered>
      <q-item v-for="chat in this.$store.state.chatList" 
      :key="chat._id" 
      class="q-my-sm" 
      clickable
      @click="openChat(chat._id)" 
      v-ripple>
        
        <!-- Shows icon using their letter -->
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ chat[chatPartner].name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <!-- Name -->
        <q-item-section>
          <q-item-label>{{ chat[chatPartner].name }}</q-item-label>
          <q-item-label caption lines="1">{{ chat[chatPartner].name }}</q-item-label>
        </q-item-section>

        <!-- Online/Offline badge -->
        <q-item-section side>
          <q-badge 
            :color="chat.online ? 'blue' : 'grey-5'">
            {{ chat.online ? "online" : "offline" }}
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
        chatPartner: this.$store.state.userType === "traveller" ? "guide" : "traveller"
      }
    },
    methods: {
      openChat(id) {
        this.$store.commit("setCurrentChat", id)
        const payload = {
          id: id,
          nextPage: "Messages"
        }
        this.$store.dispatch("getChatLog", payload)
      }
    },
  }
</script>

<style scoped>
</style>