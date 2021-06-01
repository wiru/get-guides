import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createSocketioPlugin from "./socketioStorePlugin";
import socket from "../socket";

Vue.use(Vuex);

const socketioPlugin = createSocketioPlugin(socket);

export default new Vuex.Store({
  state: {
    currentView: "Bookings",
    userType: "",
    singleGuide:{
      id: 911327098,
      avatar: "https://randomuser.me/api/portraits/men/43.jpg",
      name: "Simon Wensleydale",
      email: "cheese-enthusiast@email.com",
      location: "Utsunomiya",
      languages: ["English", "Japanese", "Burmese", "Xhosa"],
      bio: "Wensleydale cheese was first made by French Cistercian monks from the Roquefort region, who had settled in Wensleydale. They built a monastery at Fors, but some years later the monks moved to Jervaulx in Lower Wensleydale. They brought with them a recipe for making cheese from sheep's milk. During the 14th century cows' milk began to be used instead, and the character of the cheese began to change. A little ewes' milk was still mixed in since it gave a more open texture, and allowed the development of the blue mould. At that time, Wensleydale was almost always blue with the white variety almost unknown.",
      unavailableDates: ["20210613"],
    },
    filteredGuides: [
      {
        id: "60b47b595c7aa6b557654a30",
        name: "Wiru Nihon",
        avatar: "https://i.imgur.com/U5F88Uf.png",
      },
      {
        id: "60b648cc0871333c529b05ba",
        name: "Hikaru Matsumoto",
        avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      {
        id: "60b6496b0871333c529b05bb",
        name: "Akihiro Kuwahata",
        avatar: "https://randomuser.me/api/portraits/men/66.jpg",
      },
    ],
    conversation: [
      {
        from: "Mattia Bonicelli",
        text: "Yo, what's popping G?",
        timestamp: "91328"
      },
      {
        from: "Wiru Nihon",
        text: "Nothing much dog",
        timestamp: "91332"
      }
    ],
    bookings: [
      {
        _id: "60b47b595c7aa6b557654a32",
        traveller: "60b6326339b7417d0f2649ad",
        guide: "60b47b595c7aa6b557654a30",
        location: "tokyo",
        date: "2021-08-21",
        start_time: "12:30",
        end_time: "16:30",
        meeting_location: "Shibuya, Hachiko",
        details: "A boring tour",
        status: "confirmed"
      },
      {
        _id: "60b47b595c7aa6b557654a32",
        traveller: "60b6326339b7417d0f2649ad",
        guide: "60b47b595c7aa6b557654a30",
        location: "tokyo",
        date: "2021-08-21",
        start_time: "12:30",
        end_time: "16:30",
        meeting_location: "Shibuya, Hachiko",
        details: "A boring tour",
        status: "confirmed"
      }
    ],
    somethingStupid: 0
  },
  plugins: [socketioPlugin],

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
      const data = (
        await axios.get(
          `http://localhost:5000/api/guides/search/${location}/${language}/${date}`
        )
      ).data;
      console.log(data);
      state.commit("setFilteredGuides", data);
    },

    async getSingleGuide(state, payload) {
      try {
        const data = (
          await axios.get(`http://localhost:5000/api/guides/${payload}`
          )
        ).data;
        console.log(data);
        state.commit("setSingleGuide", data);
      } catch (e) {
        console.log(e);
      }
    },

    async getChatLogs(state, payload) {
      const data = (
        await axios.get(`http://localhost:5000/api/messages/${payload}`)
      ).data
    },
    
    async dispatchMessage(state, payload) {
      socket.emit("Message", payload);
      console.log("I SENT IT YOU PRICK");
    }
  }
});
