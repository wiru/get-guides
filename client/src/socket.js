import io from 'socket.io-client'

let id = "blank"
const socket = io("http://localhost:5000", {
	auth: {
	  token: id
	}
  });

socket.on('connect', () => {
	console.log('connected now')
})
socket.on('disconnect', () => {
	console.log('disconnected now')
})
socket.on('updateId', (userId) => {
	console.log('id is currently: ', id)
	console.log('id arriving as: ', userId)
	id = userId
	console.log('newId is: ', id)
})
socket.on('changeView', () => {
	console.log("store access here")
	this.$store.state.currentView = 'HowTo';
})
socket.on('relayMessage', (message) => {
	console.log("Message Arrived")
	this.$store.commit("appendMessage", message);
})
socket.on('typingStatus', (bool) => {
	console.log("Typing Status Arrived")
	this.$store.commit("settypingStatus", bool);
})
export default socket