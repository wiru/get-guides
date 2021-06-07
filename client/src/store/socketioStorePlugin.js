export default function createSocketioPlugin(socket) {
  return store => {
    store.$socket = socket;
    socket.on("authResult", payload => {
      socket.auth.token = payload.id;

      store.commit("setUserId", payload.id);

      if (payload.path === "Search") {
        store.commit("setUserType", "traveller");
      } else if (payload.path === "MyProfile") {
        store.commit("setUserType", "guide");
      }
      store.commit("changeView", payload.path);
      store.commit("loggedIn", payload.loggedIn);

      if (payload.path === "Registration") {
        store.commit("setUserName", payload.name);
        store.commit("setUserEmail", payload.email);
        store.commit("setUsergid", payload.gid);
      }
    });
    socket.on("changeView", () => {
      console.log("store access here");
      store.state.currentView = "HowTo";
    });
    socket.on("relayMessage", message => {
      console.log("CHECKING CURRENT CHAT");
      if (store.state.sendTo === message['from']) {
        console.log("CHECK OK. MESSAGE RECEIVED")
        store.commit("appendMessage", message);
      }
    });
    socket.on("typingStatus", bool => {
      console.log("Typing Status Arrived");
      store.commit("settypingStatus", bool);
    });
    socket.on("chatUpdate", payload => store.commit("chatUpdate", payload));
  };
}
