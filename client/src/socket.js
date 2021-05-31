import io from 'socket.io-client'
const socket = io("http://localhost:5000", {
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
export default socket