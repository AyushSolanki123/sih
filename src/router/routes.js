const routes = [
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { name: "Auth", path: "/", component: () => import("pages/Auth.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "Camera",
        path: "/camera",
        component: () => import("pages/Camera.vue"),
      },
      {
        name: "Activity",
        path: "/",
        component: () => import("pages/Activity.vue"),
      },
      {
        name: "Settings",
        path: "/settings",
        component: () => import("pages/Settings.vue"),
      },
      {
        name: "People",
        path: "/people",
        component: () => import("pages/People.vue"),
      },
      {
        name: "DetailActivity",
        path: "/details",
        component: () => import("pages/DetailActivity.vue"),
      },
      {
        name: "Users",
        path: "/users",
        component: () => import("pages/Users.vue"),
      },
      {
        name: "Feedback",
        path: "/feed",
        component: () => import("pages/Feedback.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
