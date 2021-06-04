
const routes = [
  {
    // WEBLINK HERE
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    // WEBLINK HERE
    path: 'http://localhost:5000/authorized',
    component: () => import('pages/test.vue'),
  },
  {
    // WEBLINK HERE
    path: 'http://localhost:5000/login',
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
