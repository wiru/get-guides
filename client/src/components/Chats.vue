<template>
  <q-page class="flex full-width">
    <q-list bordered>
      <q-item v-for="user in this.$store.state.chatList" 
      :key="user._id" 
      class="q-my-sm" 
      clickable
      @click="openChat(user._id)" 
      v-ripple>
        
        <!-- Shows icon using their letter -->
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user[userType].name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <!-- Name -->
        <q-item-section>
          <q-item-label>{{ user[userType].name }}</q-item-label>
          <q-item-label caption lines="1">{{ user[userType].name }}</q-item-label>
        </q-item-section>

        <!-- Online/Offline badge -->
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
        userType: this.$store.state.userType === "traveller" ? "guide" : "traveller"
      }
    },
    methods: {
      openChat(id) {
        this.$store.commit("setCurrentChat", id)
        this.$store.dispatch("getChatLog", id)
        // this.$store.commit("changeView", "Messages")
      }
  },
  created() {
    // console.log("user type is: ", this.$store.state.userType)
    if (this.$store.state.userType === "traveller") {
      console.log("created Fired for if Traveller: ")
      console.log("created state id is currently: ", this.$store.state.id)
      this.$store.dispatch("getTravellerChats", this.$store.state.id)
    } else {
      console.log("else statement ran")
      this.$store.dispatch("getGuideChats", this.$store.state.id)
    }
    // console.log("chat List from chats page: ", this.$store.state.chatList)
  }
  }
</script>

<style scoped>
h1 {
    color: rgb(105, 255, 125);
}
</style>