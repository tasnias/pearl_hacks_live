<template>
  <div>
    <v-card-title class="d-flex justify-center font-weight-bold">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" @click="back">
            mdi-arrow-left
          </v-icon>
        </template>
        <span>Sign in page</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      Sign in Link Sent
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <p>
        We've emailed {{ email }} a link to complete the sign in and/or
        registration process for access to the live site.
      </p>
      <p>Make sure to check your spam folder if you can't find the email.</p>
      <v-alert
        border="left"
        color="primary"
        outlined
        type="warning"
        class="mt-3"
        >The sent link is only valid <b>once</b> and for a limited time. To sign
        in again, generate a new link by re-entering your email in the
        <router-link to="/auth/sign_in_or_register" class="underline"
          >sign in</router-link
        >
        page.
      </v-alert>
    </v-card-text>
  </div>
</template>

<script>
// TODO: Add watch on store.user; if it changes to !null, redirect
export default {
  name: "LinkSent",
  watch: {
    watch: {
      user(val) {
        console.log(val);
        if (val != null) {
          this.$router.push({ name: "Dashboard" });
        }
      }
    }
  },
  computed: {
    // If the user signs out in another tab, navigate away
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  methods: {
    back: function() {
      this.$router.push({ name: "SignInOrRegister" });
    }
  },
  data: () => ({
    email: window.localStorage.getItem("email")
  })
};
</script>
<style lang="scss" scope>
.underline {
  text-decoration: underline;
}
</style>
