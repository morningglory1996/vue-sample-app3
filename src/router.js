import Vue from "vue";
import Router from "vue-router";
import store from "./store";

const Home = () => import(/* webpackChunkName: "Home"*/ "./views/Home.vue");
const User = () => import(/* webpackChunkName: "User"*/ "./views/User");
const HeaderHome = () =>
  import(/* webpackChunkName: "Home"*/ "./components/header/HeaderHome");
const UserProfile = () =>
  import(/* webpackChunkName: "User"*/ "./components/user/UserProfile.vue");
const UserDetail = () =>
  import(/* webpackChunkName: "User"*/ "./components/user/UserDetail.vue");
const SignUp = () => import(/* webpackChunkName: "SignUp"*/ "./views/SignUp");
const Login = () => import(/* webpackChunkName: "Login"*/ "./views/Login");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      components: {
        main: Home,
        header: HeaderHome,
      },
    },
    {
      path: "/user",
      components: {
        main: User,
        header: HeaderHome,
      },
      beforeEnter(to, from, next) {
        if (store.getters.userData.isAuthenticated) {
          next();
        } else {
          next("login");
        }
      },
      children: [
        {
          path: ":id/profile",
          component: UserProfile,
          name: "user-id-profile",
        },
        {
          path: ":id/detail",
          component: UserDetail,
          name: "user-id-detail",
        },
      ],
    },
    {
      path: "/sign-up",
      components: {
        main: SignUp,
        header: HeaderHome,
      },
      beforeEnter(to, from, next) {
        if (store.getters.userData.isAuthenticated) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      components: {
        main: Login,
        header: HeaderHome,
      },
      beforeEnter(to, from, next) {
        if (store.getters.userData.isAuthenticated) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  // },
});
