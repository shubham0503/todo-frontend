import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

Vue.use(VueRouter);

function requiresAuth(to, from, next) {
  if (localStorage.getItem('loggedInUser')) {
    next();
  } else {
    next('/login');
  }
}

function authenticated(to, from, next) {
  if (localStorage.getItem('loggedInUser')) {
    next('/todo');
  } else {
    next();
  }
}

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'minimal'
    },
    beforeEnter: authenticated
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      layout: 'minimal'
    },
    beforeEnter: authenticated
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import( /* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue'),
    meta: {
      layout: 'default'
    },
    beforeEnter: requiresAuth
  },
  {
    path: '/todo',
    name: 'To Do',
    component: () => import( /* webpackChunkName: "todo" */ '../pages/Todo.vue'),
    meta: {
      layout: 'default'
    },
    beforeEnter: requiresAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router