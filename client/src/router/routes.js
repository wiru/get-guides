
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/authorized',
    component: () => import('pages/test.vue'),
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter() {location.href = 'http://localhost:5000/login'},
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
