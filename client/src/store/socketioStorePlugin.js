export default function createSocketioPlugin (socket) {
	return store => {
	  store.$socket = socket
	  socket.on('message', payload => store.dispatch('receiveMessage', payload))
	}
  }