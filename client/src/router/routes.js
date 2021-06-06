const routes = [
  {
    // WEBLINK HERE
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    // WEBLINK HERE
    path: "https://g1000.herokuapp.com/authorized",
    component: () => import("pages/test.vue")
  },
  {
    // WEBLINK HERE
    path: "https://g1000.herokuapp.com/login",
    name: "login",
    beforeEnter() {
      window.location.replace("https://g1000.herokuapp.com/login");
    }
    //component: 'login'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
