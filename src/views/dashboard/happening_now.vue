<template>
  <v-card rounded class="rounded-xl elevated">
    <v-card-title class="d-flex justify-center">Happening Now</v-card-title>
    <v-card-text>
      <div v-for="event in eventsHappeningNow" :key="event.id">
        <a :href="event['Location']" target="_blank" v-if="event['Location']">{{
          event["Event"]
        }}</a>
        <span v-else>{{ event["Event"] }}</span>
        (until {{ formatEvent(event["End Time"]) }})
        <v-divider></v-divider>
      </div>
    </v-card-text>
    <!-- <v-divider></v-divider> -->
    <v-card-actions
      ><v-btn depressed rounded color="primary" to="schedule" small
        >View full schedule</v-btn
      ></v-card-actions
    >
  </v-card>
</template>
<script>
import moment from "moment-timezone";
export default {
  name: "HappeningNow",
  data: () => ({
    eventsHappeningNow: [],
    interval: 0
  }),
  computed: {
    allEvents() {
      return this.$store.getters.getAllEvents;
    }
  },
  methods: {
    calculateEventsHappeningNow() {
      this.eventsHappeningNow = this.allEvents.filter(event =>
        this.happeningNow(event)
      );
    },
    happeningNow(event) {
      let currentTime = moment().tz("America/New_York");
      return currentTime.isBetween(event["Start Time"], event["End Time"]);
    },
    formatEvent(momentObject) {
      return momentObject.format("ddd h:mm a z");
    }
  },
  beforeCreate() {
    this.$store.dispatch("listAllEvents");
  },
  mounted() {
    this.calculateEventsHappeningNow();
    this.interval = setInterval(() => {
      this.calculateEventsHappeningNow();
    }, 1000);
  }
};
</script>
