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
      Add or Edit Information
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-subtitle class="subheading font-weight-regular text-center">
      If you pre-registered for Pearl Hacks with the same email, we've tried to
      fill in some of the information for you. Take a moment to verify or edit
      the fields below.
    </v-card-subtitle>
    <v-card-text>
      <v-form
        v-model="valid"
        ref="form"
        lazy-validation
        @submit.prevent="verifyAndNavigate"
      >
        <v-text-field
          v-model="email"
          label="email"
          dense
          rounded
          filled
          color="primary"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="firstname"
          label="First Name"
          dense
          rounded
          filled
          color="primary"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          v-model="lastname"
          label="Last Name"
          dense
          rounded
          filled
          color="primary"
          :rules="[rules.required]"
        ></v-text-field>
        <v-radio-group v-model="role">
          <template v-slot:label>
            <p>I am attending Pearl Hacks as a...</p>
          </template>
          <v-radio label="Hacker" value="Hacker"></v-radio>
          <v-radio
            label="Sponsor Representative/Sponsor Mentor"
            value="Sponsor Representative"
          ></v-radio>
          <v-radio
            label="Non-sponsor Mentor"
            value="Non-sponsor Mentor"
          ></v-radio>
        </v-radio-group>
        <v-text-field
          v-model="grad_year"
          v-if="role == 'Hacker'"
          label="Graduation Year"
          color="primary"
          dense
          rounded
          filled
          :rules="[rules.required]"
        ></v-text-field>
        <!-- <v-autocomplete
          v-model="organization"
          :label="organization_label[role]"
          :items="organization_options[role]"
          color="primary"
          dense
          rounded
          filled
          :rules="[rules.required]"
        ></v-autocomplete>
        <p v-if="organization == 'Other'">If Other, please specify:</p>
        <v-text-field
          v-model="organization_other"
          v-if="organization == 'Other'"
          :label="organization_label[role]"
          color="primary"
          dense
          filled
          rounded
          :rules="[rules.required]"
        ></v-text-field> -->
        <v-text-field
          v-model="organization"
          :label="organization_label[role]"
          color="primary"
          dense
          filled
          rounded
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          v-model="discord"
          label="Discord Username"
          color="primary"
          dense
          filled
          rounded
        ></v-text-field>
        <div class="d-flex justify-end">
          <v-btn
            color="primary"
            rounded
            depressed
            class="py-0 px-6 py-0"
            @click="createUser"
            >Finish</v-btn
          >
        </div>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import schoolList from "./auth_helpers";
import firebase from "firebase";

export default {
  name: "AddUserInfo",
  beforeCreate() {
    // find user in registrants spreadsheet if it exists

    // get sponsor list
    this.$store.dispatch("loadSponsorList");
  },
  computed: {
    organization_options() {
      return {
        Hacker: schoolList.concat(["Other"]),
        "Sponsor Representative": [
          ...this.$store.getters.getAllSponsorNames,
          "Other"
        ],
        "Non-sponsor Mentor": ["UNC Computer Science Department", "Other"]
      };
    }
  },
  methods: {
    back() {
      
      this.$router.push("/auth");
    },
    async createUser() {
      if (this.$refs.form.validate()) {
        // let organization =
        //   this.organization != "Other"
        //     ? this.organization
        //     : this.organization_other;
        let document = await firebase
          .firestore()
          .collection("users")
          .doc(this.email)
          .get();

        if (document && document.exists) {
          alert("Error: Trying to create a user who already exists.");
        } else {
          // set their info in firestore
          let createdUser = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            role: this.role,
            discord: this.discord,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            organization: this.organization,
            isJudge: false
          };
          await document.ref.set(
            {
              ...createdUser
            },
            { merge: true }
          );
          this.$store.dispatch("setUser", createdUser);
        }
        this.$router.push({ name: "Dashboard" });
      }
    }
  },
  data: () => ({
    valid: true,
    rules: {
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail";
      }
    },
    email: window.localStorage.getItem("email"),
    firstname: "",
    lastname: "",
    role: "Hacker",
    organization: "",
    // organization_other: null,
    grad_year: null,
    organization_label: {
      Hacker: "School",
      "Sponsor Representative": "Organization or Company",
      "Non-sponsor Mentor": "Organization, Company, or School"
    },
    discord: ""
  })
};
</script>
