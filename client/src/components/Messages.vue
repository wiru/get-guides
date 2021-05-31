<template>
  <q-page class="flex full-width column">
      <q-banner inline-actions class="text-white bg-red">
      User is offline.
    </q-banner>
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

export default {
    name: 'Messages',
    data() {
      return { 
        newMessage: '',
        messages: [ 
          {
            text: 'hey dickhead! :)',
            from: 'me'
          },
          {
            text: 'Fuck you, you dick',
            from: 'you'
          },
          {
            text: "Oh don't be such a goon",
            from: 'me'
          },
          {
            text: "You're the fucking goon",
            from: 'you'
          }
        ]
      }
    },
	  methods: {
      sendMessage() {
        this.messages.push({
          text: this.newMessage,
          from: 'me'
        })
        this.newMessage = ''
      }
    },
}
</script>

<style scoped>
h1 {
    color: rgb(105, 255, 125);
}
</style>
