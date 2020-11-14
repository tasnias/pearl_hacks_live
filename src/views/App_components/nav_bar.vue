<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      app
      v-if="user && isSignedIn"
      clipped
      class="elevation-0"
    >
      <v-list floating dense rounded>
        <v-list-item-group color="primary">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item to="/schedule">
            <v-list-item-icon>
              <v-icon>mdi-calendar-range</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Schedule</v-list-item-title>
          </v-list-item>

          <v-list-item to="/faq">
            <v-list-item-icon>
              <v-icon>mdi-help-rhombus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>More Resources</v-list-item-title>
          </v-list-item>

          <v-list-item to="/directory">
            <v-list-item-icon>
              <v-icon>mdi-account-search</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Directory</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Announcements</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left v-if="user && isSignedIn" class="elevation-0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center pl-1">
        <router-link :to="{ name: 'Dashboard' }" class="d-flex flex-row">
          <v-img
            alt="Pearl Hacks Logo"
            class="shrink mr-2"
            contain
            src="~@/assets/logo.png"
            transition="scale-transition"
            width="30"
          />

          <span class="ph-logo-text d-none d-sm-inline"
            ><b>Pearl Hacks</b> Live</span
          >
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon>
        <!-- TODO: Add link -->
        <v-icon color="indigo lighten-3">mdi-discord</v-icon>
      </v-btn>

      <v-btn icon>
        <!-- TODO: Add link -->
        <v-icon>mdi-file-document-box-search</v-icon>
      </v-btn>
      <v-btn icon class="mr-2" @click="toggleProfileCard">
        <v-avatar color="info" size="40"
          >{{ user.firstname.charAt(0) }}{{ user.lastname.charAt(0) }}</v-avatar
        >
      </v-btn>
      <v-card
        class="profile-card rounded-xl elevated"
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
        <v-card-subtitle class="text-center"
          >{{ user.email }} <br />{{ user.role }} |
          {{ user.organization }}</v-card-subtitle
        >
        <v-card-text class="text-center">
          <div class="d-flex justify-center">
            <v-btn
              depressed
              rounded
              outlined
              color="primary"
              @click="goToProfilePage"
              >My Profile</v-btn
            >
          </div>
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
  </nav>
</template>
<script>
import firebase from "firebase";
export default {
  name: "NavBar",
  computed: {
    // If the user signs out in another tab, this.user from the store
    // will be out of sync. We fall back on the firebase auth state
    // to verify signed in state.
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
      this.isSignedIn = user != null;
    });
  },
  data: () => ({
    drawer: false,
    showProfileCard: false,
    isSignedIn: false
  }),
  methods: {
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
        })
        .catch(error => {
          alert(error.message);
        });
    },
    goToProfilePage() {
      this.$router.push({ name: "Profile" });
      this.showProfileCard = false;
    }
  }
};
</script>
<style lang="scss" scope>
@import "../../styles/variables.scss";
nav header {
  background-color: white !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-bottom: thin solid $borderColor !important;
}

.profile-card {
  position: absolute !important;
  top: 60px;
  right: 10px;
  min-width: 300px;
}
</style>
