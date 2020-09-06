import Vue from "vue";
import Router from "vue-router";

const Home = () => import(/* webpackChunkName: "Home"*/ "./views/Home.vue");
const User = () => import(/* webpackChunkName: "User"*/ "./views/User");
const HeaderHome = () =>
  import(/* webpackChunkName: "Home"*/ "./components/header/HeaderHome");
const HeaderUser = () =>
  import(/* webpackChunkName: "User"*/ "./components/header/HeaderUser");
const UserProfile = () =>
  import(/* webpackChunkName: "User"*/ "./components/user/UserProfile.vue");
const UserDetail = () =>
  import(/* webpackChunkName: "User"*/ "./components/user/UserDetail.vue");
const SignUp = () => import("./views/SignUp");
const Login = () => import("./views/Login");

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
      beforeEnter(to, from, next) {
        next();
      },
      components: {
        main: User,
        header: HeaderUser,
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
    },
    {
      path: "/login",
      components: {
        main: Login,
        header: HeaderHome,
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
