<template>
  <div>
    <v-card-title class="d-flex justify-center font-weight-bold"
      >Sign in</v-card-title
    >
    <!-- <v-card-subtitle class="subheading font-weight-regular text-center"> -->
    <!-- Forgot password? -->
    <!-- </v-card-subtitle> -->
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="signIn"
      >
        <v-text-field
          v-model="email"
          label="Email"
          filled
          rounded
          color="primary"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          filled
          rounded
          type="password"
          color="primary"
          :rules="[rules.required]"
        ></v-text-field>
        <div class="px-2 pb-3">
          <p>
            <a>Forgot password?</a>
          </p>
          <p>
            <router-link to="/auth/sign_in_or_register"
              >User passwordless authentication.</router-link
            >
          </p>
        </div>
        <div class="d-flex justify-space-between">
          <v-btn
            color="primary"
            depressed
            rounded
            text
            class="py-0 px-6 py-0"
            @click="goToRegister"
            >Register</v-btn
          >
          <v-btn
            color="primary"
            depressed
            rounded
            class="py-0 px-6 py-0"
            type="submit"
            @click="signIn"
            >Next</v-btn
          >
        </div>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import AuthService from "../../services/auth_service";
import firebase from "firebase";
export default {
  name: "SignIn",
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  methods: {
    goToRegister() {
      this.$router.push({ name: "Register" });
    },
    signIn() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            firebase.auth().onAuthStateChanged(async user => {
              if (user) {
                this.$router.push({ name: "Dashboard" });
                window.localStorage.setItem("email", this.email);
              }
            });
          })
          .catch(error => {
            alert(error.message);
          });
      }
    }
  },
  data: () => ({
    rules: {
      required: value => !!value || "",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail";
      }
    },
    valid: true,
    email: "",
    password: "",
    authService: new AuthService()
  })
};
</script>
