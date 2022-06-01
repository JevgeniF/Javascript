import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/identity/LoginView.vue'
import LogoutComponent from '@/components/identity/Logout.vue'
import RegisterView from '../views/identity/RegisterView.vue'
import SubscriptionView from '@/views/SubscriptionView.vue'
import AccountView from '@/views/AccountView.vue'
import ProfilesView from '@/views/ProfilesView.vue'
import ProfileMoviesView from '@/views/ProfileMoviesView.vue'
import MovieDetailsView from '@/views/MovieDetailsView.vue'
import TheatreView from '@/views/TheatreView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutComponent
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    component: SubscriptionView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/profiles',
    name: 'profiles',
    component: ProfilesView
  },
  {
    path: '/movies',
    name: 'movies',
    component: ProfileMoviesView
  },
  {
    path: '/movie-details',
    name: 'movieDetails',
    component: MovieDetailsView
  },
  {
    path: '/theatre',
    name: 'theatre',
    component: TheatreView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
