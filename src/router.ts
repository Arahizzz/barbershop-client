import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

const history = createWebHistory();
const routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('./views/HelloWorld.vue'), props: { msg: 'Message'} },
    { name: 'login', path: '/login', component: () => import('./views/Login.vue') },
    { name: 'booking', path:'/booking', component: () => import('./views/Booking.vue') }
    // { name: 'masters', path: '/masters', component: () => import('./views/MasterList.vue'), props: true },
    // { name: 'procedures', path: '/procedures', component: () => import('./views/ProcedureList.vue'), props: true },
    // { name: 'dateAndTime', path: '/dateTime', component: () => import('./views/DateAndTime.vue'), props: true },
];

const router = createRouter({ history, routes });
export default router;