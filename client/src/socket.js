import io from "socket.io-client";

// WEBLINK HERE
const socket = io("wss://g1000.herokuapp.com")

// http://localhost:5000
// wss://getguides.herokuapp.com

socket.on("connect", () => {
  console.log("connected now");
});
socket.on("disconnect", () => {
  console.log("disconnected now");
});

export default socket;
