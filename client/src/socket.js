import io from 'socket.io-client'
const socket = io("http://localhost:5000", { //this needs to be updated
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
socket.on('authorized', () => {
	this.$store.commit("changeView", "HowTo")
})

export default socket