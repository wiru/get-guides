import io from "socket.io-client";

let id = "blank";
// WEBLINK HERE
const socket = io("wss://g1000.herokuapp.com", {
  auth: {
    token: id
  }
});

// http://localhost:5000
// wss://g1000.herokuapp.com

socket.on("connect", () => {
  console.log("connected now");
});
socket.on("disconnect", () => {
  console.log("disconnected now");
});
socket.on("updateId", userId => {
  console.log("id is currently: ", id);
  console.log("id arriving as: ", userId);
  id = userId;
  console.log("newId is: ", id);
});

export default socket;
