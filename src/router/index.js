import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../views/UserList.vue';
import UserDetails from '../views/UserDetails.vue';

const routes = [
  { path: '/', name: 'UserList', component: UserList },
  { path: '/user/:id', name: 'UserDetails', component: UserDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
