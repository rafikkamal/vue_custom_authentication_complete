import Vue from 'vue'
import Router from 'vue-router'
import store from './store';

Vue.use(Router)

const default_url__dashboard = "/users"
const default_url__login = "/login"

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      beforeEnter: (to, from, next) => {
        checkLoginRegistrationRouteAccess(to, next);
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('./views/Registration.vue'),
      beforeEnter: (to, from, next) => {
        checkLoginRegistrationRouteAccess(to, next);
      }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/Users.vue'),
      beforeEnter: (to, from, next) => {
        checkAdminRouteAccess(to, next);
      }
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('./views/User.vue'),
      beforeEnter: (to, from, next) => {
        checkAdminRouteAccess(to, next);
      }
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

/*
 * Original code from tutorial
 */
// router.beforeEach((to, from, next) => {
//   store.dispatch('fetchAccessToken');
//   if (to.fullPath === '/users') {
//     if (!store.state.accessToken) {
//       next('/login');
//     }
//   }
//   if (to.fullPath === '/login') {
//     if (store.state.accessToken) {
//       console.log("has accessToken")
//       next('/users');
//     }
//   }
//   next();
// });

/*
 * My Horrible Creation
 */
router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken')
  store.dispatch('fetchUserInfo')
  next()
});

let checkAdminRouteAccess = (to, next) => {
  if(getAdminRoutes().includes(to.name)) {
    if (!store.state.accessToken) {
      next(default_url__login)
    } else { 
      next()
    }
  }
}

let checkLoginRegistrationRouteAccess = (to, next) => {
  if(getLoginRegistrationRoutes().includes(to.name)) {
    if (store.state.accessToken) {
      next(default_url__dashboard)
    } else { 
      next()
    }
  }
}

let getAdminRoutes = () => {
  return [
    "users",
    "user"
  ];
}

let getLoginRegistrationRoutes = () => {
  return [
    "login",
    "registration"
  ];
}

export default router;