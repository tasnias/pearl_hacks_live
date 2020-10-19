<template>
  <v-app>
    <navigation-drawer></navigation-drawer>

    <v-app-bar app clipped-left color="white" v-if="user">
      <v-app-bar-nav-icon @click.stop="toggleNavDrawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center pl-1">
        <v-img
          alt="Pearl Hacks Logo"
          class="shrink mr-2"
          contain
          src="https://pearlhacks.github.io/2021Website/assets/images/phlogo.svg"
          transition="scale-transition"
          width="30"
        />

        <span class="ph-logo-text d-none d-sm-inline"
          ><b>Pearl Hacks</b> Live</span
        >
      </div>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-discord</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-video-outline</v-icon>
      </v-btn>
      <v-btn icon class="mr-2" @click="toggleProfileCard">
        <v-avatar color="info" size="40"
          >{{ user.firstname.charAt(0) }}{{ user.lastname.charAt(0) }}</v-avatar
        >
      </v-btn>
      <v-card
        class="profile-card rounded-xl"
        v-if="showProfileCard"
        v-click-outside="onClickOutside"
      >
        <v-card-title class="d-flex flex-column">
          <v-avatar color="info" size="75"
            >{{ user.firstname.charAt(0)
            }}{{ user.lastname.charAt(0) }}</v-avatar
          >
          {{ user.firstname }} {{ user.lastname }}
        </v-card-title>
        <v-card-subtitle class="text-center">{{ user.email }}</v-card-subtitle>
        <v-card-text class="text-center">
          {{ user.role }} | {{ user.organization }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn
            depressed
            rounded
            outlined
            color="primary"
            @click.stop="signOut"
            >Sign out</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-app-bar>
    <v-main class="grey lighten-5">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import NavigationDrawer from "./App_components/navigation_drawer";
export default {
  name: "App",
  components: {
    "navigation-drawer": NavigationDrawer
  },
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  data: () => ({
    drawer: false,
    showProfileCard: false
  }),
  methods: {
    toggleNavDrawer() {
      this.$store.dispatch("toggleNavDrawer");
    },
    toggleProfileCard: function() {
      if (!this.showProfileCard) {
        this.showProfileCard = true;
      }
    },
    onClickOutside: function() {
      this.showProfileCard = false;
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("setUser", null);
          this.$router.push({ name: "SignIn" });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>
<style lang="scss">
@import "./styles/variables.scss";
.v-navigation-drawer__border {
  background-color: transparent !important;
}

.v-btn {
  text-transform: none !important;
}

.v-app-bar,
.v-application .elevation-1 {
  box-shadow: 0 2px 6px rgba(75, 75, 75, 0.2) !important;
}

.ph-logo-text {
  font-family: $heading-font-family;
  font-size: 1.3rem;
}

.profile-card {
  position: absolute !important;
  top: 60px;
  right: 10px;
  min-width: 300px;
}
</style>
