export default function createSocketioPlugin (socket) {
	return store => {
		store.$socket = socket
	  	socket.on('authResult', payload => {
			socket.auth.token = payload.id
			// console.log(socket.auth.token)
			socket.disconnect().connect()
			store.commit('setUserId', payload.id)
			store.commit('changeView', payload.path)
			store.commit('loggedIn', payload.loggedIn)
			console.log("payload path is: ", payload.path)
			if (payload.path === "Registration") {
				store.commit('setUserName', payload.name)
				store.commit('setUserEmail', payload.email)
				store.commit('setUsergid', payload.gid)
			}
			if (payload.path === 'Search') {
				store.commit('setUserType', 'traveller')
			}
			if (payload.path === "MyProfile") {
				store.commit('setUserType', 'guide')
			}	
		})	
		socket.on('chatUpdate', payload => store.commit('chatUpdate', payload))
	}
  }
