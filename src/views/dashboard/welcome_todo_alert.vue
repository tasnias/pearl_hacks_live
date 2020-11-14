<template>
  <v-alert
    rounded
    class="rounded-xl white--text"
    color="secondary"
    type="info"
    outlined
    v-if="showWelcomeTodoAlert"
  >
    <div class="d-flex justify-space-between align-start">
      <p class="pa-0 ma-0">
        Welcome to Pearl Hacks 2021! Make sure to join the Pearl Hacks
        <a href="#" target="_blank">Discord </a> and download
        <a href="https://www.webex.com/downloads.html" target="_blank"
          >WebEx
        </a>
        so you can stay in touch during the event. Use this site as a place to
        view resources, but please check Discord for real-time updates and
        announcements.
      </p>

      <v-btn icon small @click="hideAlert"><v-icon>mdi-close</v-icon></v-btn>
    </div>
  </v-alert>
</template>
<script>
export default {
  name: "WelcomeTodoAlert",
  data: () => ({
    showWelcomeTodoAlert: true
  }),
  created() {
    this.showWelcomeTodoAlert =
      window.localStorage.getItem("showWelcomeTodoAlert") != null
        ? false
        : true;
  },
  methods: {
    hideAlert() {
      this.showWelcomeTodoAlert = false;
      window.localStorage.setItem("showWelcomeTodoAlert", "false");
    }
  }
};
</script>
