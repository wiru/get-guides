import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createSocketioPlugin from "./socketioStorePlugin";
import socket from "../socket";

Vue.use(Vuex);

const socketioPlugin = createSocketioPlugin(socket);

export default new Vuex.Store({
  state: {
    currentView: "SearchResults",
    userType: "",
    guideID: "60b47b595c7aa6b557654a30",
    singleGuide: {},
    filteredGuides: [],
    somethingStupid: 0
  },
  plugins: [socketioPlugin],
  // sync stuff - Use "commit"
  mutations: {
    changeView(state, payload) {
      this.state.currentView = payload;
    },
    setUserType(state, payload) {
      this.state.userType = "traveller";
    },
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
          `http://localhost:5000/api/guides/search/${location}/${language}/${date}/${meme}`
        )
      ).data;
      console.log(data);
      state.commit("setFilteredGuides", data);
    },

    async getSingleGuide(state) {
      let id = this.state.guideID;
      try {
        const data = (await axios.get(`http://localhost:5000/api/guides/${id}`))
          .data;
        console.log(data);
        state.commit("setSingleGuide", data);
      } catch (e) {
        console.log(e);
      }
    },

    async dispatchMessage(state, payload) {
      socket.emit("Message", payload);
      console.log("I SENT IT YOU PRICK");
    }
  }
});
