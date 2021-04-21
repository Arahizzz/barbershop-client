import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

const history = createWebHistory();
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./views/Main.vue"),
  },
  {
    name: "login",
    path: "/login",
    props: true,
    component: () => import("./views/Login.vue"),
  },
  {
    name: "register",
    path: "/register",
    props: true,
    component: () => import("./views/Registration.vue"),
  },
  {
    name: "procedure",
    path: "/booking/procedure",
    component: () => import("./views/booking/ProcedureList.vue"),
  },
  {
    name: "master",
    path: "/booking/master",
    component: () => import("./views/booking/MasterList.vue"),
  },
  {
    name: "dateTime",
    path: "/booking/dateTime",
    component: () => import("./views/booking/DateAndTime.vue"),
  },
  {
    name: "accountConfirm",
    path: "/booking/account",
    component: () => import("./views/booking/AccountConfirm.vue")
  },
  {
    name: "summary",
    path: "/booking/summary",
    component: () => import("./views/booking/Summary.vue"),
  },
  {
    name: "bookingSuccess",
    path: "/booking/success",
    component: () => import("./views/booking/Success.vue")
  },
  {
    name: "bookingView",
    path: "/bookingView/:id",
    component: () => import("./views/BookingView.vue"),
    props: true
  },
  {
    name: "clientBookings",
    path: "/mybookings",
    component: () => import("./views/MyBookings.vue")
  },
  {
    name: "masterPage",
    path: "/master/:id",
    component: () => import("./views/MasterPage.vue"),
    props: true
  }
];

const router = createRouter({ history, routes });
export default router;
