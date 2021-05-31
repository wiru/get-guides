import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import createSocketioPlugin from './socketioStorePlugin'
import socket from '../socket'

Vue.use(Vuex);

const socketioPlugin = createSocketioPlugin(socket)

export default new Vuex.Store({
    state: {
      currentView: "Chats",
      selectedChat: "Chats",
      userType: ""
    },
    plugins: [socketioPlugin],
    // sync stuff - Use "commit"   
    mutations: {
      changeView(state, payload) {
        this.state.currentView = payload;
      },
      setUserType(state, payload) {
        this.state.userType = "traveller"
      }
      
    },
    // async stuff - Use "dispatch"
    actions: {
      dispatchMessage(state, payload) {
        socket.emit("Message", payload)
        console.log("I SENT IT YOU PRICK")
      }
    }
 });