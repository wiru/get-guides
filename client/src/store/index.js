import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createSocketioPlugin from "./socketioStorePlugin";
import socket from "../socket";

Vue.use(Vuex);

const socketioPlugin = createSocketioPlugin(socket);

export default new Vuex.Store({
  state: {
    currentView: "Login",
    userType: "",
    // Changed for Auth
    id: "",
    name: "",
    email: "",
    gid: "",
    travellerPackage: {},
    guidePackage: {},
    ////
    currentChatId: '',
    currentChat: [],

    singleGuide: {},
    filteredGuides: [],
    somethingStupid: 0,
    loggedIn: "false"
    
  },
  plugins: [socketioPlugin],
  // sync stuff - Use "commit"
  mutations: {
    changeView(state, payload) {
      this.state.currentView = payload;
    },
    loggedIn(state, bool) {
      // console.log("loggedIn ", bool), 
      this.state.loggedIn = bool
      // console.log(this.state.loggedIn)
    },
    setUserType(state, payload) {
      this.state.userType = "traveller";
    },
    // Changed for Auth
    setUserId(state, payload) {
      // console.log("id ", payload)
      this.state.id = payload;
      // console.log(this.state.id)\
    },
    chatUpdate(state, payload) {
      for (message of payload) {
        this.state.currentChat.push(message)
      }
    },
    setUserName(state, payload) {
      this.state.name = payload;
    },
    setUserEmail(state, payload) {
      this.state.email = payload;
    },
    setUsergid(state, payload) {
      this.state.gid = payload;
    },
    setTravellerPackage(state, payload) {
      this.state.travellerPackage = payload
    },
    setGuidePackage(state, payload) {
      this.state.guidePackage = payload
    },
    ////////////

    setFilteredGuides(state, payload) {
      this.state.filteredGuides = payload;
      console.log("Setter's");
      console.log(this.state.filteredGuides);
    },
    setSingleGuide(state, payload) {
      this.state.singleGuide.id = payload._id;
      this.state.singleGuide.name = payload.name;
      this.state.singleGuide.avatar = payload.avatar;
      this.state.singleGuide.languages = payload.languages;
      this.state.singleGuide.locations = payload.locations;
      this.state.singleGuide.weekdays = payload.weekdays;
      this.state.singleGuide.bio = payload.bio;
      this.state.singleGuide.gallery = payload.gallery;
      this.state.singleGuide.rate = payload.rate;
      this.state.singleGuide.unavailableDates = payload.unavailable_dates;
      console.log("setter function");
      this.state.somethingStupid += 1;
      console.log("forced render", Date.now());
    }
  },
  // async stuff - Use "dispatch"
  actions: {
    login(state) {
      this.$router.push("/login");
    },

    async receiveMessage(state, payload) {
      console.log("this was received:", payload);
    },

    async search(state, payload) {
      state.commit("setFilteredGuides");
    },

    async getFilteredGuides(state, payload) {
      console.log("Payload is: ", payload);
      const location = payload.location;
      const language = payload.language;
      const date = payload.date;
      const meme = payload.meme;
      const data = (
        await axios.get(
          `/api/guides/search/${location}/${language}/${date}/${meme}`
        )
      ).data;
      console.log(data);
      state.commit("setFilteredGuides", data);
    },

    async getSingleGuide(state, payload) {
      console.log(payload);
      try {
        const data = (
          await axios.get(`/api/guides/${payload}`)
        ).data;
        console.log(data);
        state.commit("setSingleGuide", data);
      } catch (e) {
        console.log(e);
      }
    },

    async getChatLogs(state, payload) {
      const data = (
        await axios.get(`/api/messages/${payload}`)
      ).data;
    },

    async dispatchMessage(state, payload) {
      socket.emit("Message", payload);
      console.log("I SENT IT YOU PRICK");
    },
    // For Registration
    async travellerPackage(state, payload) {
      socket.emit('newTravellerRegistration', payload)
      console.log('newTravellerRegistration on front')
      },
    async guidePackage(state, payload) {
      socket.emit('newGuideRegistration', payload)
      console.log('newGuideRegistration on front')
      }
  }
});
