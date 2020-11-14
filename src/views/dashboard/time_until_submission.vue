<template>
  <v-card rounded class="rounded-xl elevated">
    <v-card-title class="d-flex justify-center"
      >Time Until Submission</v-card-title
    >
    <v-card-text>
      <h2 class="text-center">
        {{ days }}{{ wordString.day }} {{ hours }}{{ wordString.hours }}
        {{ minutes }}{{ wordString.minutes }} {{ seconds
        }}{{ wordString.seconds }}
      </h2></v-card-text
    >
    <v-card-actions
      ><v-btn depressed rounded color="primary" small
        >Submit project</v-btn
      ></v-card-actions
    >
  </v-card>
</template>
<script>
export default {
  name: "TimeUntilSubmission",
  computed: {
    endtime() {
      // TODO: GET THIS IN UTC-0
      return new Date("Febuary 21, 2021 12:00:00").getTime();
    },
    starttime() {
      return Date.now();
    }
  },
  data: () => ({
    timer: "",
    wordString: {
      day: "d",
      hours: "h",
      minutes: "m",
      seconds: "s"
    },
    start: "",
    end: "",
    interval: "",
    days: "",
    minutes: "",
    hours: "",
    seconds: ""
  }),
  mounted() {
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount: function(start, end) {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = start - now;
      var passTime = end - now;

      if (distance < 0 && passTime < 0) {
        clearInterval(this.interval);
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
      }
    },
    calcTime: function(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    }
  }
};
</script>
