import Home from '../pages/Home.vue'
import Learn from '../pages/Learn.vue'
import ModuleDetail from '../pages/ModuleDetail.vue'
import RealStories from '../pages/RealStories.vue'
import About from '../pages/About.vue'
import Donate from '../pages/Donate.vue'
import Feedback from '../pages/Feedback.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import Dashboard from '../pages/user/Dashboard.vue'
import Achievements from '../pages/user/Achievements.vue'
import Success from '../pages/Success.vue'

export const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/learn', name: 'Learn', component: Learn },
  { path: '/learn/:id', name: 'ModuleDetail', component: ModuleDetail },
  { path: '/stories', name: 'RealStories', component: RealStories },
  { path: '/about', name: 'About', component: About },
  { path: '/donate', name: 'Donate', component: Donate },
  { path: '/feedback', name: 'Feedback', component: Feedback },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/achievements', name: 'Achievements', component: Achievements, meta: { requiresAuth: true } },
  { path: '/success', name: 'Success', component: Success }
]