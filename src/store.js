import Vue from "vue";
import Vuex from "vuex";
import AuthService from "./services/auth_service";
import ScheduleService from "./services/schedule_service";
import FaqService from "./services/faq_service";
import WorkshopsService from "./services/workshops_service";
import FlagService from "./services/flag_service";

Vue.use(Vuex);
const authService = new AuthService();
const faqService = new FaqService();
const scheduleService = new ScheduleService();
const workshopService = new WorkshopsService();
const flagService = new FlagService();

/*userState: {
  email, 
  firstname, 
  lastname, 
  role, 
  organization, 
  discord,
  pronouns,
  created, 
  updated
} */

export default new Vuex.Store({
  state: {
    user: null,
    // TODO: REMOVE
    sponsors: [],
    team: null,
    project: null,
    faqs: null,
    // TODO: refactor so that events/schedule are combined
    schedule: {},
    events: [],
    workshops: [],
    flags: null,
    unsubscribers: []
  },
  getters: {
    // TODO: REMOVE
    getAllSponsorNames: state => {
      return state.sponsors.map(sponsor => sponsor.name);
    },
    getCurrentUser: state => state.user,
    getAllFAQs: state => state.faqs,
    getFullSchedule: state => state.schedule,
    getAllEvents: state => state.events,
    getAllWorkshops: state => state.workshops,
    getFlag: state => flag =>
      state && state.flags && state.flags[flag] ? state.flags[flag] : false,
    getEvent: state => event =>
      state.events && state.events[event] ? state.events[event] : {},
    getUserSettings: state =>
      state.user && state.user["settings"] ? state.user["settings"] : {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    // TODO: REMOVE
    setAllSponsors(state, sponsors) {
      state.sponsors = sponsors.map(sponsor => ({
        image_url: sponsor["Sponsor Image URL"],
        site_url: sponsor["Sponsor Site URL"],
        tier: sponsor["Sponsor Tier"],
        name: sponsor["Sponsor Title"]
      }));
    },
    setAllFAQs(state, faqs) {
      state.faqs = faqs;
    },
    setFullSchedule(state, schedule) {
      state.schedule = schedule;
    },
    setEventsList(state, events) {
      state.events = events;
    },
    setAllWorkshops(state, workshops) {
      state.workshops = workshops;
    },
    setAllFlags(state, flags) {
      state.flags = flags;
    },
    addUnsubsribe(state, unsubscriber) {
      state.unsubscribers.push(unsubscriber);
    },
    setUserSettings(state, settings) {
      if (state.user) {
        state.user["settings"] = settings;
      }
    }
  },
  actions: {
    // TODO: REMOVE
    loadSponsorList(context) {
      authService.getAllSponsors().then(sponsors => {
        context.commit("setAllSponsors", sponsors);
      });
    },
    setUser(context, user) {
      context.commit("setUser", user);
    },
    loadAllFAQs(context) {
      let faqs = faqService.getAllFAQs();
      context.commit("setAllFAQs", faqs);
    },
    loadFullSchedule(context, useEST) {
      if (useEST) {
        scheduleService.getFullScheduleEST().then(schedule => {
          context.commit("setFullSchedule", schedule);
        });
      } else {
        scheduleService.getFullScheduleLocalTime().then(schedule => {
          context.commit("setFullSchedule", schedule);
        });
      }
    },
    listAllEvents(context) {
      scheduleService.listAllEvents().then(events => {
        context.commit("setEventsList", events);
      });
    },
    loadAllWorkshops(context) {
      workshopService.getAllWorkshops().then(workshops => {
        context.commit("setAllWorkshops", workshops);
      });
    },
    loadAllFlags(context) {
      flagService.setupFlagsListener(context);
    },
    onFlagsChanged({ commit }, payload) {
      if (payload["flags"]) {
        commit("setAllFlags", payload["flags"]);
      }
      if (payload["error"]) {
        console.log("idk something went wrong");
      }
    },
    addUnsubscribe(context, unsubscriber) {
      context.commit("addUnsubsribe", unsubscriber);
    }
  }
});
