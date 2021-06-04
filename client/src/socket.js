import io from 'socket.io-client'

// WEBLINK HERE
const socket = io("http://localhost:5000/", { //this needs to be updated
	transportOptions: {
		polling: {
			auth: 123
		}
	}
})
socket.on('connect', () => {
	console.log('connected now')
	socket.emit()	
})
socket.on('disconnect', () => {
	console.log('disconnected now')
})
socket.on('changeView', () => {
	console.log("store access here")
	this.$store.state.currentView = 'HowTo';
})

export default socket