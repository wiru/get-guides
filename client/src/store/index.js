import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import serverLink from "../serverLink";
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
    sendTo: "",
    searchQuery: {
      location: "",
      language: "",
      date: ""
    },
    travellerPackage: {},
    guidePackage: {},
    ////
    currentChat: "",
    currentChatLog: [],
    typingStatus: false,
    chatList: [],
    singleGuide: {},
    guideSelf: {},
    bookings: [],
    filteredGuides: [],
    loggedIn: "false"
  },
  plugins: [socketioPlugin],
  // sync stuff - Use "commit"
  mutations: {
    changeView(state, payload) {
      this.state.currentView = payload;
    },
    loggedIn(state, bool) {
      this.state.loggedIn = bool;
    },
    setUserType(state, payload) {
      console.log("setting user type to: ", payload);
      this.state.userType = payload;
    },
    // Changed for Auth
    setUserId(state, payload) {
      console.log("setuserid function in store ", payload);
      this.state.id = payload;
      socket.emit("matchSocketWithMongoId", payload);
    },
    setCurrentChat(state, id) {
      this.state.currentChat = id;
      console.log(this.state.currentChat);
    },
    chatUpdate(state, payload) {
      for (message of payload) {
        this.state.currentChatLog.push(message);
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
    setSearchQuery(state, payload) {
      this.state.searchQuery = payload;
      console.log("In store, setSearchQuery", payload);
      console.log(
        "maybe I did it right ",
        this.state.searchQuery.date,
        Date.now()
      );
    },
    setTravellerPackage(state, payload) {
      this.state.travellerPackage = payload;
    },
    setGuidePackage(state, payload) {
      this.state.guidePackage = payload;
    },

    setFilteredGuides(state, payload) {
      this.state.filteredGuides = payload;
      console.log(payload)
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
      console.log("before ", payload.unavailable_dates);
      let toBeFilteredOut = payload.unavailable_dates;
      toBeFilteredOut = toBeFilteredOut.map(function(el) {
        return (
          el.substring(0, 4) +
          "/" +
          el.substring(4, 6) +
          "/" +
          el.substring(6, 8)
        );
      });
      this.state.singleGuide.unavailableDates = toBeFilteredOut;
    },
    setUser(state, payload) {
      console.log(payload)
      this.state.guideSelf.id = payload._id;
      this.state.guideSelf.name = payload.name;
      this.state.guideSelf.avatar = payload.avatar;
      this.state.guideSelf.languages = payload.languages;
      this.state.guideSelf.locations = payload.locations;
      this.state.guideSelf.weekdays = payload.weekdays;
      this.state.guideSelf.bio = payload.bio;
      this.state.guideSelf.gallery = payload.gallery;
      this.state.guideSelf.rate = payload.rate;
      console.log("before ", payload.unavailable_dates);
      let toBeFilteredOut = payload.unavailable_dates;
      toBeFilteredOut = toBeFilteredOut.map(function(el) {
        return (
          el.substring(0, 4) +
          "/" +
          el.substring(4, 6) +
          "/" +
          el.substring(6, 8)
        );
      });
      this.state.guideSelf.unavailableDates = toBeFilteredOut;
    },

    setBookings(state, payload){
      this.state.bookings = payload;
    },

    setChatList(state, payload) {
      this.state.chatList = payload;
      console.log("State after setting: ", this.state.chatList)
    },

    appendMessage(state, message) {
      this.state.currentChatLog.push(message);
    },
    setTypingStatus(state, bool) {
      this.state.typingStatus = bool;
    },
    setCheckoutSessionId(state, payload) {
      this.state.checkoutSessionId = payload;
    }
  },
  // async stuff - Use "dispatch"
  actions: {
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
          `${serverLink}/api/guides/search/${location}/${language}/${date}/${meme}`
        )
      ).data;
      state.commit("setFilteredGuides", data);
      state.commit("changeView", payload.nextPage);
    },

    async getSingleGuide(state, payload) {
      console.log("getSingleGuide called", payload);
      try {
        const data = (
          await axios.get(
            `${serverLink}/api/guides/${payload.id}`
          )
        ).data;
        state.commit("setSingleGuide", data);
        state.commit("changeView", payload.nextPage);
      } catch (e) {
        console.log(e);
      }
    },

    async getUser(state, payload) {
      try {
        const data = (
          await axios.get(
            `${serverLink}/api/guides/${payload.id}`
          )
        ).data;

        state.commit("setUser", data);
        state.commit("changeView", payload.nextPage)
      } catch (e) {
        console.log(e);
      }
    },

    async getChatLog(state, payload) {
      const data = (
        await axios.get(`${serverLink}/api/conversations/${payload.id}/messages`)
      ).data;
      console.log("data: ", data);
      console.log("messages: ", data.messages);
      let to = this.state.userType === "guide" ? "traveller" : "guide";
      this.state.currentChatLog = data.messages;
      console.log(data[to]._id);
      this.state.sendTo = data[to]._id;
      console.log(this.state.sendTo);
      state.commit("changeView", payload.nextPage)
    },

    async getTravellerChats(state, payload) {
      const data = (
        await axios.get(`${serverLink}/api/conversations/traveller/${payload.id}`)
      ).data;
      state.commit("setChatList", data);
      console.log("Data passed to setter: ", data)
      state.commit("changeView", payload.nextPage)
    },
    async silentChatFetch(state, payload) {
      const data = (
        await axios.get(`${serverLink}/api/conversations/traveller/${payload}`)
      ).data;
      state.commit("setChatList", data);
      console.log("Data passed to setter: ", data)
    },

    async getGuideChats(state, payload) {
      const data = (
        await axios.get(`${serverLink}/api/conversations/guide/${payload.id}`)
      ).data;
      state.commit("setChatList", data);
      console.log("Data passed to setter: ", data)
      state.commit("changeView", payload.nextPage);
    },

    async getBookings(state, payload) {
      const data = (
        await axios.get(
          `${serverLink}/api/bookings/${this.state.userType}/${this.state.id}`
        )
      ).data;
      state.commit('setBookings', data)
      state.commit('changeView', "Bookings")
    },
    // For Registration
    async travellerPackage(state, payload) {
      axios
        .post(`${serverLink}/api/travellers/newtravellerregistration`, payload)
        .then(data => state.commit("setUserId", data["data"]))
        .then(state.commit("setUserType", "traveller"))
        .then(state.commit("loggedIn", true))
        .then(state.commit("changeView", "Search"));
    },
    async guidePackage(state, payload) {
      const newGuideId = (await axios.post(`${serverLink}/api/guides/newguideregistration`, payload)).data;
      console.log("This is the newGuideId", newGuideId)
      state.commit("setUserId", newGuideId)
      state.commit("setUserType", "guide")
      state.commit("loggedIn", true)
      state.dispatch("getUser", {id: newGuideId, nextPage: 'My Profile' })
      state.commit("changeView", "My Profile");
    },
   
    async guidePackageUpdate(state, payload) {
      axios.post(`${serverLink}/api/guides/update`, payload);
      state.commit("changeView", "My Profile");
    }
  },
  getters: {
    chatChecker(state) {
      console.log("GETTTTTAAAAAAAAAZZZZ");
      return Object.keys(state.currentChatLog).length;
    }
  }
});
