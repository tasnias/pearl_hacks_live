<template>
  <div>
    <v-card-title class="d-flex justify-center font-weight-bold"
      >Register</v-card-title
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
        @submit.prevent="register"
      >
        <v-text-field
          v-model="email"
          label="Email"
          filled
          autocomplete="email"
          rounded
          color="primary"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          filled
          rounded
          autocomplete="new-password"
          type="password"
          color="primary"
          :rules="[rules.required]"
        ></v-text-field>
        <!-- <v-text-field
          v-model="password_confirm"
          label="Confirm Password"
          filled
          rounded
          autocomplete="new-password"
          type="password"
          color="primary"
          :rules="[rules.required]"
        ></v-text-field> -->
        <div class="d-flex justify-space-between">
          <v-btn
            color="primary"
            depressed
            rounded
            text
            class="py-0 px-6 py-0"
            @click="goToSignIn"
            >Sign in</v-btn
          >
          <v-btn
            color="primary"
            depressed
            rounded
            class="py-0 px-6 py-0"
            @click="register"
            >Register</v-btn
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
  name: "Register",
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  watch: {
    user(val) {
      console.log(val);
      if (val != null) {
        this.$router.push({ name: "Dashboard" });
      }
    }
  },
  methods: {
    goToSignIn() {
      this.$router.push({ name: "SignIn" });
    },
    register() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            window.localStorage.setItem("email", this.email);
          })
          .catch(error => {
            alert(error.message);
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
    password: "",
    password_confirm: "",
    authService: new AuthService()
  })
};
</script>
