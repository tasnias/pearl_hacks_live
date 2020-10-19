<template>
  <div>
    <v-alert
      border="left"
      color="error"
      class="elevated"
      type="info"
      dismissible
      >Make sure to join both the Pearl Hacks Discord and WebEx so you can stay
      in touch during the event. You can also access these links from the
      toolbar above.</v-alert
    >
    <!-- <h2 class="text-center py-3 pb-2 heading">
      Dashboard
    </h2> -->
    <main>
      <v-row>
        <v-col cols="12" md="4">
          <time-until-submission></time-until-submission>
        </v-col>
        <v-col cols="12" md="4"
          ><v-card rounded class="rounded-lg ma-0 mb-5 elevated">
            <v-card-title class="d-flex justify-center"
              >Quick Links</v-card-title
            >
            <v-card-text
              >Search for workshops Learn how to submit a project submit a
              project discord
            </v-card-text></v-card
          ><v-card rounded class="rounded-lg elevated">
            <v-card-title class="d-flex justify-center"
              >Happening Now</v-card-title
            >
            <v-card-text></v-card-text>
            <v-card-actions
              ><v-btn depressed rounded color="primary" small
                >View full schedule</v-btn
              ></v-card-actions
            >
          </v-card></v-col
        >
        <v-col cols="12" md="4"
          ><v-card rounded class="rounded-lg ma-0 elevated">
            <v-card-title class="d-flex justify-center"
              >Mentor Requests</v-card-title
            >
            <v-card-text
              >You have no outstanding mentor requests. To request technical
              help from a mentor, open a ticket in the mentor hub.</v-card-text
            >
            <v-card-actions>
              <v-btn depressed rounded color="primary" small
                >Go to Mentor Hub</v-btn
              ></v-card-actions
            >
          </v-card></v-col
        >
      </v-row>
    </main>
  </div>
</template>

<script>
import TimeUntilSubmission from "./dashboard/time_until_submission";
export default {
  name: "Dashboard",
  components: {
    "time-until-submission": TimeUntilSubmission
  },
  data: () => ({})
};
</script>
<style lang="scss" scope>
.v-divider {
  max-width: auto !important;
}

.v-application .elevated {
  box-shadow: 0 2px 5px rgba(75, 75, 75, 0.2) !important;
}
</style>
