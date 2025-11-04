import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalendarView from '../views/CalendarView.vue'
import ScoreView from '../views/ScoreView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import ProfileView from '../views/ProfileView.vue'
import MoreModule from '@/views/MoreModule.vue'
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/calendar', name: 'Calendar', component: CalendarView },
  { path: '/score', name: 'Score', component: ScoreView },
  { path: '/schedule', name: 'Schedule', component: ScheduleView },
  { path: '/profile', name: 'Profile', component: ProfileView },
  { path: '/more', name: 'MoreModule', component: MoreModule },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
