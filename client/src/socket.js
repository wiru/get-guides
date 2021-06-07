import io from "socket.io-client";

// WEBLINK HERE
const socket = io("wss://localhost:8080")

// http://localhost:5000
// wss://localhost:8080

socket.on("connect", () => {
  console.log("connected now");
});
socket.on("disconnect", () => {
  console.log("disconnected now");
});

export default socket;
