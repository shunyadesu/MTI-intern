import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/templates/Login.vue'
import Profile from '../views/templates/Profile.vue'
import ProfileEdit from '../views/templates/ProfileEdit.vue'
import User from '../views/templates/User.vue'
import Post from '../views/Post.vue'
import TopPage from '../views/TopPage.vue'
import Negative from '../views/Negative.vue'
import Positive from '../views/Positive.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home',
        isRequiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        title: 'Profile',
        isRequiredAuth: true
      }
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: ProfileEdit,
      meta: {
        title: 'ProfileEdit',
        isRequiredAuth: true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        title: 'User',
        // isRequiredAuth: true
      }
    },
    {
      path: '/post',
      name: 'Post',
      component: Post,
      meta: {
        title: 'Post',
        isRequiredAuth: true
      }
    },
    {
      path: '/TopPage',
      name: 'TopPage',
      component: TopPage,
      meta: {
        title: 'TopPage',
      }
    },
    {
      path: '/negative',
      name: 'Negative',
      component: Negative,
      meta: {
        title: 'Negative',
        isRequiredAuth: true
      }
    },
     {
      path: '/positive',
      name: 'Positive',
      component: Positive,
      meta: {
        title: 'Positive',
        isRequiredAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isRequiredAuth)) {
    if (window.localStorage.getItem('token') !== 'mtiToken') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


const DEFAULT_TITLE = 'TITLE';

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
