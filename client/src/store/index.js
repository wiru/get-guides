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
      // this.state.searchQuery.date =
      // this.state.searchQuery.date.substring(0, 4) +
      // "/" +
      // this.state.searchQuery.date.substring(4, 6) +
      // "/" +
      // this.state.searchQuery.date.substring(6, 8);

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
    setGuidePackageUpdate(state, payload) {
      this.state.guidePackageUpdate = payload;
    },
    setFilteredGuides(state, payload) {
      this.state.filteredGuides = payload;
      console.log("Setter's");
      console.log(this.state.filteredGuides);
      this.state.currentView = "SearchResults";
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
      this.state.currentView = "SelectedProfile";
      this.state.somethingStupid += 1;
    },
    setSelf(state, payload) {
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
      //this.state.currentView = "MyProfile"
      this.state.somethingStupid += 1;
    },

    setChatList(state, payload) {
      console.log("setChatList payload: ", payload);
      this.state.chatList = payload;
      console.log("chat list is : ", this.state.chatList);
      // console.log(this.state.chatList[0].traveller.name)
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
      console.log("date async ", date, Date.now());
      const data = (
        await axios.get(
          // WEBLINK HERE
          `${serverLink}/api/guides/search/${location}/${language}/${date}/${meme}`
        )
      ).data;
      state.commit("setFilteredGuides", data);
    },

    async getSingleGuide(state, payload) {
      console.log("getSingleGuide called", payload);
      try {
        const data = (
          await axios.get(
            // WEBLINK HERE
            `${serverLink}/api/guides/${payload}`
          )
        ).data;
        console.log(data);
        state.commit("setSingleGuide", data);
        console.log("state commit setSingleGuide happened");
      } catch (e) {
        console.log(e);
      }
    },

    async getSelf(state, payload) {
      console.log("getSelf called", payload);
      try {
        const data = (
          await axios.get(
            // WEBLINK HERE
            `${serverLink}/api/guides/${payload}`
          )
        ).data;
        console.log(data);
        state.commit("setSelf", data);
        console.log("state commit setSelf happened");
      } catch (e) {
        console.log(e);
      }
    },

    async getChatLog(state, payload) {
      const data = (
        await axios.get(`${serverLink}/api/conversations/${payload}/messages`)
      ).data;
      console.log("data: ", data);
      console.log("messages: ", data.messages);
      let to = this.state.userType === "guide" ? "traveller" : "guide";
      this.state.currentChatLog = data.messages;
      console.log(data[to]._id);
      this.state.sendTo = data[to]._id;
      console.log(this.state.sendTo);
      this.state.currentView = "Messages";
    },

    async getTravellerChats(state, payload) {
      console.log("getTrav payload should be id: ", payload);
      const data = (
        await axios.get(`${serverLink}/api/conversations/traveller/${payload}`)
      ).data;
      state.commit("setChatList", data);
    },

    async getGuideChats(state, payload) {
      const data = (
        await axios.get(`${serverLink}/api/conversations/guide/${payload}`)
      ).data;
      state.commit("setChatList", data);
    },

    async getBookings(state) {
      const data = (
        await axios.get(
          // WEBLINK HERE
          `${serverLink}/api/bookings/${this.state.userType}/${this.state.id}`
        )
      ).data;
      console.log(
        `${serverLink}/api/bookings/${this.state.userType}/${this.state.id}`
      );
      this.state.bookings = data;
      console.log("get bookings data: ", data);
    },
    async openBookingStartChat(state, payload) {
      let data = {
        traveller: "60b6326339b7417d0f2649ad",
        guide: "60b47b595c7aa6b557654a30",
        location: "your mom",
        date: "Tomorrow, I guess",
        start_time: "lol",
        end_time: "ecks Dee",
        meeting_location: "deez nuts",
        details: "I have ligma",
        status: "pending",
        conversation: "098123098312980"
      };
      axios.post(`${serverLink}/api/bookings`, data);
    },
    // For Registration
    async travellerPackage(state, payload) {
      axios
        .post(`${serverLink}/api/travellers/newtravellerregistration`, payload)
        .then(data => state.commit("setUserId", data["data"]))
        .then(state.commit("setUserType", "traveller"))
        .then(state.commit("loggedIn", true))
        .then(state.commit("changeView", "HowTo"));
    },
    async guidePackage(state, payload) {
      axios
        .post(`${serverLink}/api/guides/newguideregistration`, payload)
        .then(data => state.commit("setUserId", data["data"]))
        .then(state.commit("setUserType", "guide"))
        .then(state.commit("loggedIn", true))
        .then(state.commit("changeView", "HowTo"));
    },

    async guidePackageUpdate(state, payload) {
      axios.post(`${serverLink}/api/guides/update`, payload);
      console.log("guide Update on front");
    }
  },
  getters: {
    chatChecker(state) {
      console.log("GETTTTTAAAAAAAAAZZZZ");
      return Object.keys(state.currentChatLog).length;
    }
  }
});
