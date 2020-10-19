<template>
  <div>
    <v-card-title class="d-flex justify-center font-weight-bold"
      >Sign in or Register</v-card-title
    >
    <v-card-subtitle class="subheading font-weight-regular text-center">
      If you registered on our TypeForm ahead of time, make sure to use the same
      email here.
    </v-card-subtitle>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="sendSignInLinkIfValid"
      >
        <v-text-field
          v-model="email"
          label="Email"
          filled
          rounded
          color="primary"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <div class="d-flex justify-end">
          <v-btn
            color="primary"
            depressed
            rounded
            class="py-0 px-6 py-0"
            @click="sendSignInLinkIfValid"
            >Next</v-btn
          >
        </div>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import AuthService from "../../services/auth_service";

export default {
  name: "SignInOrRegister",
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  watch: {
    user(val) {
    console.log(val)
    if (val != null) {
        this.$router.push({ name: "Dashboard" });
      }
    }
  },
  methods: {
    sendSignInLinkIfValid() {
      if (this.$refs.form.validate()) {
        let actionCodeSettings = {
          // TODO(tasnias): Fix redirect link for prod.
          // URL you want to redirect back to. The domain (www.example.com) for this
          // URL must be whitelisted in the Firebase Console.
          url: "http://localhost:8080/#/auth/finish",
          // This must be true.
          handleCodeInApp: true
        };
        let email = this.email;
        this.authService
          .sendSignInEmailLink(email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem("emailForSignIn", email);
            this.$router.push("/auth/link_sent");
          })
          .catch(error => {
            alert(error);
          });
      }
    }
  },
  data: () => ({
    rules: {
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail";
      }
    },
    valid: true,
    email: "",
    authService: new AuthService()
  })
};
</script>
