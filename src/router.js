import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Recipes from '@/components/Recipes.vue';
import Categories from '@/components/Categories.vue';
import LoginForm from '@/components/LoginForm.vue';
import Profile from '@/components/Profile.vue';

const routes = [
  { path: '/',           name: 'home',       component: Home },
  { path: '/recipes',    name: 'recipes',    component: Recipes },
  { path: '/categories', name: 'categories', component: Categories },
  { path: '/login',      name: 'login',      component: LoginForm },
  { path: '/profile',    name: 'profile',    component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;