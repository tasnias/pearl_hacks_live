<template>
  <div>
    <opening-ceremony-banner></opening-ceremony-banner>
    <welcome-todo-alert></welcome-todo-alert>
    <!-- <h1 class="text-center py-5 heading">
      Welcome to Pearl Hacks 2021!
    </h1> -->
    <main>
      <v-row>
        <v-col cols="12" md="4">
          <time-until-submission></time-until-submission>
        </v-col>
        <v-col cols="12" md="4"
          ><v-card rounded class="rounded-xl ma-0 mb-5 elevated">
            <v-card-title class="d-flex justify-center"
              >Quick Links</v-card-title
            >
            <v-card-text
              ><router-link :to="{ name: 'Workshops' }"
                >Search for workshops</router-link
              >
              <v-divider></v-divider> Learn how to submit a project
              <v-divider></v-divider><a href="">Discord</a>
              <v-divider></v-divider> </v-card-text></v-card
          ><happening-now></happening-now
        ></v-col>
        <v-col cols="12" md="4"
          ><v-card rounded class="rounded-xl ma-0 elevated">
            <v-card-title class="d-flex justify-center">My Team</v-card-title>
            <v-card-text
              >You are not affiliated with any teams. To submit a project for
              prizes, create or ask to join an existing team.</v-card-text
            >
            <v-card-actions>
              <v-btn depressed rounded color="primary" small
                >Manage My Team</v-btn
              ></v-card-actions
            >
          </v-card></v-col
        >
      </v-row>
    </main>
  </div>
</template>

<script>
import TimeUntilSubmission from "./time_until_submission";
import OpeningCeremonyBanner from "./opening_ceremony_banner";
import WelcomeTodoAlert from "./welcome_todo_alert";
import HappeningNow from "./happening_now";
export default {
  name: "Dashboard",
  components: {
    "time-until-submission": TimeUntilSubmission,
    "opening-ceremony-banner": OpeningCeremonyBanner,
    "welcome-todo-alert": WelcomeTodoAlert,
    "happening-now": HappeningNow
  },
  data: () => ({
    hideDismissableContent:
      window.localStorage.getItem("hideDismissableContent") != null
        ? true
        : false
  })
};
</script>
