<template>
  <q-page class="flex full-width column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messageLog"
        :key="message.text"
        :text="[message.text]"
        :sent="message.from == me"
        :bg-color="message.from == me ? 'green-5' : 'grey-4'"
      />
      <q-spinner-dots v-if="typingStatus" size="2rem" />
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
    // computed: {
    //   chatCheck() {
    //     return this.$store.chatChecker
    //   }
    // },
    watch: {
      messageLog: function () {
        return console.log("WATCH MESSAGE LOG FIRED")
      },
      newMessage: function() {
        if (this.newMessage !== "") {
          this.typingStatus = true;
        } else {
          this.typingStatus = false;
        }
        console.log("NS", this.typingStatus)
        console.log("SHOULD EMIT TS NOW")
        socket.emit("typingStatus", {
            to: this.you,
            status: this.typingStatus
        })
      }
    },
    created() {
      socket.on('typingStatus', (payload)=>{
        console.log("TYPING STATUS ON LISTNER")        
        if (this.$store.state.currentChat === payload.to) {
          this.typingStatus = payload.status
        }
      }),
      socket.on("relayMessage", message => {
        console.log("CHECKING CURRENT CHAT");
        if (this.you === message['from']) {
          console.log("CHECK OK. MESSAGE RECEIVED AND PUSHING")
          this.messageLog.push(message);
        }
      })
    },
    name: 'Messages',
    data() {
      return {
        messageLog: this.$store.state.currentChatLog,
        typingStatus: false,
        me: this.$store.state.id,
        you: this.$store.state.sendTo,
        newMessage: ''
      }
    },
    // This should allow for hot-reloading of typing status 
	  methods: {
      sendMessage() {
        let date = Date.now()
        console.log("PUSHING TO CHAT LOG")
        this.messageLog.push({
          text: this.newMessage,
          from: this.$store.state.id,
          timestamp: date
        })
        console.log("PRE CHAT EMIT")
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
      }
    },
}
</script>

<style scoped>
h1 {
    color: rgb(105, 255, 125);
}
</style>
