<template>
  <q-page 
  ref="chatPage"
  class="flex full-width column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messageLog"
        :key="message.text"
        :text="[message.text]"
        :sent="message.from == me"
        :bg-color="message.from == me ? 'green-5' : 'grey-4'"
      />
      <q-spinner-dots v-if="theirTypingStatus" size="2rem" />
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
    watch: {
      messageLog: function (val) {
        console.log(val);
        this.scrollToBottom();
        return console.log("WATCH MESSAGE LOG FIRED")
      },
      newMessage: function() {
        if (this.newMessage !== "") {
          this.myTypingStatus = true;
        } else {
          this.myTypingStatus = false;
        }
        console.log("NS", this.myTypingStatus)
        console.log("SHOULD EMIT TS NOW")
        socket.emit("typingStatus", {
            to: this.you,
            from: this.me,
            status: this.myTypingStatus
        })
      }
    },
    created() {
      socket.on('typingStatus', (payload)=>{
        console.log("TYPING STATUS ON LISTNER")
        console.log("THISYOU", this.you)
        console.log("PAYTO", payload)        
        if (this.you === payload.from) {
          this.theirTypingStatus = payload.status
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
        myTypingStatus: false,
        theirTypingStatus: false,
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
      },
      scrollToBottom() {
        let chatPage = this.$refs.chatPage.$el
        console.log("STB METHOD FIRED")
        console.log("CHAT PAGE", chatPage)
        console.log("CHAT PAGE HEIGHT", chatPage.scrollHeight)
        setTimeout(() => {
          window.scrollTo(0, chatPage.scrollHeight)}, 20);
        }
    },
}
</script>

<style scoped>
h1 {
    color: #235;
}
</style>
