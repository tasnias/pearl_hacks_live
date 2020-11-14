<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main class="lighten-5">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./views/App_components/nav_bar";
export default {
  name: "App",
  components: {
    "nav-bar": NavBar
  },
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  }
};
</script>
<style lang="scss">
@import "./styles/variables.scss";
.v-navigation-drawer__border {
  background-color: transparent !important;
  // border-left: thin solid $borderColor;
}

.v-btn {
  text-transform: none !important;
}

.v-application .elevation-1,
.v-application .elevated {
  box-shadow: 0 2px 6px $borderColor !important;
  // box-shadow: none !important;
  border: thin solid $borderColor !important;
}

.ph-logo-text {
  font-family: $heading-font-family;
  font-size: 1.3rem;
  color: #284639 !important;
}

a {
  text-decoration: none;
}

.heading {
  color: #284639 !important;
  margin: -1rem !important;
  margin-bottom: 0rem !important;
  font-family: $body-font-family;
  font-weight: 400;
}

.v-card__title {
  font-weight: 600 !important;
  // font-family: $heading-font-family;
}

.v-ripple__container {
  display: none !important;
}
</style>
