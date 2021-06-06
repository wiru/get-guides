<template>
  <q-page class="flex full-width column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in this.$store.state.currentChatLog"
        :key="message.text"
        :text="[message.text]"
        :sent="message.from == me"
        :bg-color="message.from == me ? 'green-5' : 'grey-4'"
      />
      <q-spinner-dots v-if="this.$store.state.typingStatus" size="2rem" />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">  
          <q-input
            v-model="newMessage" 
            bg-color="white"
            outlined
            rounded
            label="Message" 
            dense
            @change="typingStatus">
            <template v-slot:after>
              <q-btn
              @click="sendMessage"
              round 
              color="white"
              dense 
              flat 
              icon="send" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import socket from "../socket";

export default {
    name: 'Messages',
    data() {
      return { 
        me: this.$store.state.id,
        you: this.$store.state.sendTo,
        newMessage: ''
      }
    },
	  methods: {
      sendMessage() {
        let date = Date.now()
        this.$store.state.currentChatLog.push({
          text: this.newMessage,
          from: this.$store.state.id,
          timestamp: date
        })
        socket.emit("typingStatus", {
          to: this.$store.state.sendTo,
          status: false
        })
        socket.emit(
          'chatMessage', 
        {
          conversationId: this.$store.state.currentChat, 
          text: this.newMessage,
          from: this.$store.state.id,
          to: this.$store.state.sendTo,
          timestamp: date
        })
        this.newMessage = ""
      },
      typingStatus() {
        console.log("TYPING")
        if (this.newMessage === "") {
          socket.emit("typingStatus", {
            to: this.$store.state.sendTo,
            status: false
          })
        } else {
          socket.emit("typingStatus", {
            to: this.$store.state.sendTo,
            status: true
          })
        }
      }
    },
}
</script>

<style scoped>
h1 {
    color: rgb(105, 255, 125);
}
</style>
