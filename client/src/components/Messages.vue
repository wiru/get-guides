<template>
  <q-page ref="chatPage" class="bg-white flex full-width column">
    <div class="bg-white q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messageLog"
        :key="message.text"
        :text="[message.text]"
        :sent="message.from == me"
        :bg-color="message.from == me ? 'teal-2' : 'grey-4'"
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
            dense
          >
            <template v-slot:after>
              <q-btn
                @click="sendMessage"
                round
                type="submit"
                :loading="submitting"
                color="white"
                dense
                flat
                icon="send"
              />
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
  mounted() {
    this.scrollToBottom();
  },
  watch: {
    messageLog: function(val) {
      this.scrollToBottom();
    },
    newMessage: function() {
      if (this.newMessage !== "") {
        this.myTypingStatus = true;
      } else {
        this.myTypingStatus = false;
      }
      socket.emit("typingStatus", {
        to: this.you,
        from: this.me,
        status: this.myTypingStatus
      });
    }
  },
  created() {
    socket.on("typingStatus", payload => {
      if (this.you === payload.from) {
        this.theirTypingStatus = payload.status;
      }
    }),
      socket.on("relayMessage", message => {
        if (this.you === message["from"]) {
          this.messageLog.push(message);
        }
      });
  },
  name: "Messages",
  data() {
    return {
      messageLog: this.$store.state.currentChatLog,
      myTypingStatus: false,
      theirTypingStatus: false,
      me: this.$store.state.id,
      you: this.$store.state.sendTo,
      newMessage: ""
    };
  },
  // This should allow for hot-reloading of typing status
  methods: {
    sendMessage() {
      let date = Date.now();

      this.messageLog.push({
        text: this.newMessage,
        from: this.$store.state.id,
        timestamp: date
      });

      socket.emit("chatMessage", {
        conversationId: this.$store.state.currentChat,
        text: this.newMessage,
        from: this.$store.state.id,
        to: this.$store.state.sendTo,
        timestamp: date
      });
      this.newMessage = "";
    },
    scrollToBottom() {
      let chatPage = this.$refs.chatPage.$el;

      setTimeout(() => {
        window.scrollTo(0, chatPage.scrollHeight);
      }, 20);
    }
  }
};
</script>

<style scoped>
h1 {
  color: #235;
}
.body {
  background-color: white !important;
}
</style>
