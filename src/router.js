import Authentication from "./views/authentication/authentication.vue";
import SignIn from "./views/authentication/sign_in";
import SignInOrRegister from "./views/authentication/sign_in_or_register";
import LinkSent from "./views/authentication/link_sent";
import Register from "./views/authentication/register";
import Dashboard from "./views/dashboard/dashboard.vue";
import Directory from "./views/directory.vue";
import Faq from "./views/more_resources/faq.vue";
import EventsSchedule from "./views/schedule/events_schedule.vue";
import Schedule from "./views/schedule/schedule.vue";
import AddUserInfo from "./views/authentication/add_user_info.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import Workshops from "./views/schedule/workshops.vue";
import store from "./store";
import firebase from "firebase";
import ProfilePage from "./views/profile/profile_page.vue";
import baseurl from "./config/urls";

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
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
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
    component: Schedule,
    meta: { requiresSignedInState: true, requiresUserInFirestore: true },
    children: [
      {
        path: "/",
        alias: "events",
        name: "EventsSchedule",
        component: EventsSchedule,
        meta: { requiresSignedInState: true, requiresUserInFirestore: true }
      },
      {
        path: "workshops",
        name: "Workshops",
        component: Workshops,
        meta: { requiresSignedInState: true, requiresUserInFirestore: true }
      }
    ]
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
      // {
      //   path: "sign_in",
      //   name: "SignIn",
      //   component: SignIn,
      //   meta: { requiresSignedOutState: true }
      // },
      // {
      //   path: "register",
      //   name: "Register",
      //   component: Register,
      //   meta: { requiresSignedOutState: true }
      // },
      {
        path: "/",
        alias: "sign_in_or_register",
        name: "SignInOrRegister",
        component: SignInOrRegister,
        meta: { requiresSignedOutState: true }
      },
      {
        path: "link_sent",
        name: "LinkSent",
        component: LinkSent,
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
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    var email = window.localStorage.getItem("email");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
      window.localStorage.setItem("email", email);
    }
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(async result => {
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        let user_doc = await firebase
          .firestore()
          .collection("users")
          .doc(result.user.email)
          .get();
        if (user_doc && user_doc.exists) {
          window.location.replace(`${baseurl}/dashboard`);
        } else {
          window.location.replace(`${baseurl}/auth/add_user_info`);
        }
      })
      .catch(error => {
        alert(error);
        window.location.replace(`${baseurl}/auth/sign_in_or_register`);
      });
  } else {
    runRouteGuards(to, from, next);
  }
});

let runRouteGuards = (to, from, next) => {
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
          // console.log("1", from.name, "->", to.name);
          next();
        } else {
          // console.log("2", from.name, "->", to.name);
          next({ name: "AddUserInfo" });
        }
      } else if (meta.requiresUserNotInFirestore) {
        if (user_doc && user_doc.exists) {
          // console.log("3", from.name, "->", to.name);
          next({ name: from.name ? from.name : "Dashboard" });
        } else {
          // console.log("4", from.name, "->", to.name);
          next();
        }
      } else {
        // console.log("5", from.name, "->", to.name);
        next();
      }
    } else if (meta.requiresSignedInState && user === null) {
      // console.log("6", from.name, "->", to.name);
      next({ name: "SignInOrRegister" });
    } else if (meta.requiresSignedOutState && user) {
      // console.log("7", from.name, "->", to.name);
      next({ name: from.name ? from.name : "Dashboard" });
    } else {
      // console.log("8", from.name, "->", to.name);
      next();
    }
  });
};

export default router;
