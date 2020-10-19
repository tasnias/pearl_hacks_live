import Vue from "vue";
import Vuex from "vuex";
import AuthService from "./services/auth_service";
import firebase from "firebase";

Vue.use(Vuex);
const authService = new AuthService();

export default new Vuex.Store({
  state: {
    user: null,
    sponsors: [],
    nav_drawer: false
  },
  getters: {
    getAllSponsorNames: state => {
      return state.sponsors.map(sponsor => sponsor.name);
    },
    getCurrentUser: state => state.user,
    getNavDrawerState: state => state.nav_drawer
  },
  mutations: {
    toggleNavDrawer(state) {
      state.nav_drawer = !state.nav_drawer;
    },
    updateUser(state, user) {
      state.user = user;
    },
    setAllSponsors(state, sponsors) {
      state.sponsors = sponsors.map(sponsor => ({
        image_url: sponsor["Sponsor Image URL"],
        site_url: sponsor["Sponsor Site URL"],
        tier: sponsor["Sponsor Tier"],
        name: sponsor["Sponsor Title"]
      }));
    }
  },
  actions: {
    loadSignedInUser(context) {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          let userdata = authService.getUserInFirestore(user.email);
          userdata.then(data => {
            if (data) {
              context.commit("updateUser", {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                role: data.role,
                organization: data.organization
              });
            } else {
              context.commit("updateUser", null);
            }
          });
        } else {
          context.commit("updateUser", null);
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    sendSignInLink(context, { email, actionCodeSettings }) {
      authService.sendSignInEmailLink(email, actionCodeSettings);
    },
    loadSponsorList(context) {
      authService.getAllSponsors().then(sponsors => {
        context.commit("setAllSponsors", sponsors);
      });
    },
    createUser(context, user) {
      authService.createUser(user).then(() => {
        context.commit("updateUser", user);
      });
    },
    signUserOut(context) {
      authService.signUserOut();
      context.commit("updateUser", null);
    },
    setUser(context, user) {
      context.commit("updateUser", user);
    },
    toggleNavDrawer(context) {
      context.commit("toggleNavDrawer");
    }
  }
});
