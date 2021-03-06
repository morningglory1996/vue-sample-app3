import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";

const Home = () => import(/* webpackChunkName: "Home"*/ "./views/Home.vue");
const User = () => import(/* webpackChunkName: "User"*/ "./views/User");
const HeaderHome = () =>
  import(/* webpackChunkName: "Home"*/ "./components/header/HeaderHome");
const UserDetail = () =>
  import(/* webpackChunkName: "User"*/ "./components/user/UserDetail.vue");
const SignUp = () => import(/* webpackChunkName: "SignUp"*/ "./views/SignUp");
const Login = () => import(/* webpackChunkName: "Login"*/ "./views/Login");
const Chat = () => import(/* webpackChunkName: "Chat"*/ "./views/Chat");

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
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            next();
          } else {
            next("login");
          }
        });
      },
      children: [
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
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            next("/user");
          } else {
            next();
          }
        });
      },
    },
    {
      path: "/login",
      components: {
        main: Login,
        header: HeaderHome,
      },
      beforeEnter(to, from, next) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            next("/user");
          } else {
            next();
          }
        });
      },
    },
    {
      path: "/chat",
      components: {
        main: Chat,
        header: HeaderHome,
      },
      beforeEnter(to, from, next) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            next();
          } else {
            next("/");
          }
        });
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
