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
import Chat from '../views/Chat.vue'
import Diagnose from '../views/Diagnose.vue'
import Diagnosehome from '../views/Diagnosehome.vue'
import Search from '../views/Search.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {

        isRequiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,

    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        title: 'ままのいえ',
        isRequiredAuth: true
      }
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: ProfileEdit,
      meta: {

        isRequiredAuth: true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        isRequiredAuth: true
      }
    },
    {
      path: '/post',
      name: 'Post',
      component: Post,
      meta: {

        isRequiredAuth: true
      }
    },
    {
      path: '/post/:pid',
      name: 'Post-p',
      component: Post,
      meta: {

        isRequiredAuth: true
      }
    },
    {
      path: '/lp',
      name: 'Lp',
      component: TopPage,

    },
    {
      path: '/negative',
      name: 'Negative',
      component: Negative,
      meta: {

        isRequiredAuth: true
      }
    },
     {
      path: '/positive',
      name: 'Positive',
      component: Positive,
      meta: {
        title: 'ままのいえ',
        isRequiredAuth: true
      }
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: {

        isRequiredAuth: true
      }
    },
     {
      path: '/diagnose',
      name: 'Diagnose',
      component: Diagnose,
      meta: {

        isRequiredAuth: true
      }
    }, 
    {
      path: '/diagnosehome',
      name: 'Diagnosehome',
      component: Diagnosehome,
      meta: {

        isRequiredAuth: true
      }
    }, 
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {

        isRequiredAuth: true
      }
    },  
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isRequiredAuth)) {
    if (
      !window.localStorage.getItem('userId') ||
      !window.localStorage.getItem('password')
    ) {
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


export default router
