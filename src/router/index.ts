import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/journey',
      name: 'journey',
      component: () => import('@/views/JourneyView.vue')
    },
    {
      path: '/achievements',
      name: 'achievements',
      component: () => import('@/views/AchievementsView.vue')
    },
    {
      path: '/requirements',
      name: 'requirements',
      component: () => import('@/views/RequirementsView.vue')
    },
    {
      path: '/theory',
      name: 'theory',
      component: () => import('@/views/TheoryExamsView.vue')
    },
    {
      path: '/finances',
      name: 'finances',
      component: () => import('@/views/FinancialView.vue')
    },
    {
      path: '/education',
      name: 'education',
      component: () => import('@/views/EducationCenterView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/UserProfileView.vue')
    }
  ]
})

export default router