<template>
  <v-card
    class="profile-card"
    v-if="showProfileCard"
    v-click-outside="onClickOutside"
  >
    <v-card-title class="d-flex flex-column">
      <v-avatar color="info" size="75">{{ user.initials }}</v-avatar>
      {{ user.firstname }} {{ user.lastname }}
      <v-btn outlined icon small>
        <v-icon>mdi-settings</v-icon>
      </v-btn></v-card-title
    >
    <v-card-subtitle class="text-center">{{ user.email }}</v-card-subtitle>

    <v-card-text class="text-center">
      {{ user.role }} | {{ user.organization }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn depressed rounded outlined color="primary" @click.stop="signOut"
        >Sign out</v-btn
      >
    </v-card-actions>
  </v-card>
</template>


<script>
import firebase from "firebase";
export default {
  name: "ProfileCard",
  components: {},
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  data: () => ({
    drawer: false,
    showProfileCard: false,
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

    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          this.$router.push("/check_in");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
