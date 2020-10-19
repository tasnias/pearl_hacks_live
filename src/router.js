import Authentication from "./views/authentication/authentication.vue";
import SignIn from "./views/authentication/sign_in";
import Register from "./views/authentication/register";
import Dashboard from "./views/dashboard.vue";
import Directory from "./views/directory.vue";
import Faq from "./views/faq.vue";
import MentorHub from "./views/mentor_hub.vue";
import Schedule from "./views/schedule/schedule.vue";
import AddUserInfo from "./views/authentication/add_user_info.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import Workshops from "./views/schedule/workshops.vue";
import store from "./store";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresSignedInState: true, requiresUserInFirestore: true }
  },
  {
    path: "/faq",
    name: "FAQ",
    component: Faq,
    meta: { requiresSignedInState: true, requiresUserInFirestore: true }
  },
  {
    path: "/schedule",
    name: "Schedule",
    meta: { requiresSignedInState: true, requiresUserInFirestore: true },
    component: Schedule,
    children: [
      {
        path: "/",
        name: "Schedule",
        component: Schedule,
        meta: { requiresSignedInState: true, requiresUserInFirestore: true }
      },
      {
        path: "/workshops",
        name: "Workshops",
        component: Workshops,
        meta: { requiresSignedInState: true, requiresUserInFirestore: true }
      }
    ]
  },
  {
    path: "/mentor_hub",
    name: "MentorHub",
    component: MentorHub,
    meta: { requiresSignedInState: true, requiresUserInFirestore: true }
  },
  {
    path: "/directory",
    name: "Directory",
    component: Directory,
    meta: { requiresSignedInState: true, requiresUserInFirestore: true }
  },
  {
    path: "/auth",
    component: Authentication,
    meta: { requiresSignedOutState: true },
    children: [
      {
        path: "/",
        name: "SignIn",
        component: SignIn,
        meta: { requiresSignedOutState: true }
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { requiresSignedOutState: true }
      },
      {
        path: "add_user_info",
        name: "AddUserInfo",
        component: AddUserInfo,
        meta: {
          requiresSignedInState: true,
          requiresUserNotInFirestore: true
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeResolve((to, from, next) => {
  firebase.auth().onAuthStateChanged(async user => {
    let meta = to.meta;
    if (meta.requiresSignedInState && user) {
      // redirect to sign in page
      let user_doc = await firebase
        .firestore()
        .collection("users")
        .doc(user.email)
        .get();

      if (meta.requiresUserInFirestore) {
        if (user_doc && user_doc.exists) {
          store.dispatch("setUser", { ...user_doc.data() });
          console.log("1", from.name, "->", to.name);
          next();
        } else {
          console.log("2", from.name, "->", to.name);
          next({ name: "AddUserInfo" });
        }
      } else if (meta.requiresUserNotInFirestore) {
        if (user_doc && user_doc.exists) {
          console.log("3", from.name, "->", to.name);
          next({ name: from.name ? from.name : "Dashboard" });
        } else {
          console.log("4", from.name, "->", to.name);
          next();
        }
      } else {
        console.log("5", from.name, "->", to.name);
        next();
      }
    } else if (meta.requiresSignedInState && user === null) {
      console.log("6", from.name, "->", to.name);
      next({ name: "SignIn" });
    } else if (meta.requiresSignedOutState && user) {
      console.log("7", from.name, "->", to.name);
      next({ name: from.name ? from.name : "Dashboard" });
    } else {
      console.log("8", from.name, "->", to.name);
      next();
    }
  });
});

export default router;
