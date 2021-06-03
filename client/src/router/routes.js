
const routes = [
  {
    // WEBLINK HERE
    path: 'https://getguides.herokuapp.com/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    // WEBLINK HERE
    path: 'https://getguides.herokuapp.com/authorized',
    component: () => import('pages/test.vue'),
  },
  {
    // WEBLINK HERE
    path: 'https://getguides.herokuapp.com/login',
    name: 'login',
    beforeEnter() {location.href = '/login'},
		//component: 'login'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
