import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      currentView: "Login",
      userType: ""
    },
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
      }
 });