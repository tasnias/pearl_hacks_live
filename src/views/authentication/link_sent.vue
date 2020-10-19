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
      We've emailed you a link to complete the sign in and/or registration
      process for Pearl Hacks 2021. Please use the link in the email to access
      the live site. Make sure to check your spam folder if you can't find the
      email.
      <v-alert
        border="left"
        color="primary"
        outlined
        type="warning"
        class="mt-3"
        >The link we've sent is only valid <b>once</b>. To sign in again,
        generate a new link by re-entering your email in the
        <router-link to="/auth">sign in</router-link> page.
      </v-alert>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "LinkSent",
  methods: {
    back: function() {
      this.$router.push("/auth");
    }
  },
  watch: {
    user(val) {
      // if the user value changes on this page
      // it means the user signed in or out on
      // another page and we must handle accordingly.
      if (val) {
        // redirect to dashboard
        this.$router.push({ name: "Dashboard" });
      } else {
        // go back to sign in page
        this.$router.push({ name: "SignInOrRegister" });
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  data: () => ({
    rules: {
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail";
      }
    }
  })
};
</script>
