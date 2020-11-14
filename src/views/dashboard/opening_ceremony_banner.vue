<template>
  <v-alert
    rounded
    class="rounded-xl white--text"
    color="secondary"
    v-if="openingCeremonyBannerFlag || happeningNow"
  >
    <v-row>
      <v-col col="12" sm="9">
        <h2>Watch our Opening Ceremony!</h2>
        <p>
          Come meet our sponsors and learn more about the logistics and
          guidelines for the next few days.
        </p>
        <v-btn depressed rounded outlined color="black" class="white"
          >Watch now</v-btn
        >
      </v-col>

      <v-col col="12" sm="3" class="d-none d-sm-flex justify-end align-center">
        <img
          src="~@/assets/plants_circle.png"
          width="150"
          height="150"
          class="ma-n3"
        />
      </v-col>
    </v-row>
  </v-alert>
</template>
<script>
import moment from "moment-timezone";
export default {
  name: "OpeningCeremonyBanner",
  computed: {
    endtime() {
      return new Date("Febuary 13, 2021 22:00:00").getTime();
    },
    starttime() {
      return Date.now();
    },
    openingCeremonyBannerFlag() {
      return this.$store.getters.getFlag("openingCeremonyBannerFlag");
    },
    openingCeremonyEvent() {
      return this.$store.getters.getEvent("Opening Ceremony");
    }
  },
  data: () => ({
    interval: "",
    happeningNow: false
  }),
  created() {
    this.$store.dispatch("loadAllFlags");
    this.$store.dispatch("listAllEvents");
  },
  mounted() {
    // Update every 1 second
    this.checkIfHappeningNow();
    this.interval = setInterval(() => {
      this.checkIfHappeningNow();
    }, 1000);
  },
  methods: {
    checkIfHappeningNow() {
      let currentTime = moment().tz("America/New_York");
      this.happeningNow = currentTime.isBetween(
        this.openingCeremonyEvent["Start Time"],
        this.openingCeremonyEvent["End Time"]
      );
    }
  }
};
</script>
