export default function createSocketioPlugin (socket) {
	return store => {
	  store.$socket = socket
	  socket.on('message', payload => store.dispatch('receiveMessage', payload)),
	  socket.on('authResult', payload => {
		console.log(payload),
		store.commit('setUserId', payload.id)
		store.commit('changeView', payload.path)
		store.commit('loggedIn', payload.loggedIn)
		if (payload.path === "Registration") {
			store.commit('setUserName', payload.name)
			store.commit('setUserEmail', payload.email)
			store.commit('setUsergid', payload.gid)
		}
		})
	}
  }