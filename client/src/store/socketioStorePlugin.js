export default function createSocketioPlugin(socket) {
  return store => {
    store.$socket = socket;
    socket.on("authResult", payload => {
      store.commit("setUserId", payload.id);

      if (payload.path === "Search") {
        store.commit("setUserType", "traveller");
      } else if (payload.path === "SelectedProfile") {
        store.commit("setUserType", "guide");
      }
      store.commit("changeView", payload.path);
      store.commit("loggedIn", payload.loggedIn);
      console.log("payload path is: ", payload.path);

      if (payload.path === "Registration") {
        store.commit("setUserName", payload.name);
        store.commit("setUserEmail", payload.email);
        store.commit("setUsergid", payload.gid);
      }
    });
    socket.on("chatUpdate", payload => store.commit("chatUpdate", payload));
  };
}
