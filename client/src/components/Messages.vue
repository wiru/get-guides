<template>
  <q-page class="flex full-width column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        :bg-color="message.from == 'me' ? 'green-5' : 'grey-4'"
      />
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
            dense>
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
        newMessage: '',
        messages: this.$store.state.currentChat
      }
    },
	  methods: {
      sendMessage() {
        // console.log(this.$store.state.id),
        socket.emit(
          'chatMessage', 
        {
          conversationId: this.$store.state.currentChat, 
          text: this.newMessage,
          from: this.$store.state.id
        })
      }
    },
}
</script>

<style scoped>
h1 {
    color: rgb(105, 255, 125);
}
</style>
