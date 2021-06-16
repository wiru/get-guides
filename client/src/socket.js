import io from "socket.io-client";

// WEBLINK HERE
const socket = io("wss://getguides.herokuapp.com");

// http://localhost:5000
// wss://getguides.herokuapp.com

socket.on("connect", () => {
  //console.log("connected now");
});
socket.on("disconnect", () => {
  //console.log("disconnected now");
});

export default socket;
