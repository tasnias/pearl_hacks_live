<template>
  <div class="d-flex justify-center justify-md-end">
    <v-card class="elevated rounded-xl" v-if="profileFormState == 'viewing'"
      ><v-card-title class="d-flex justify-center"
        >Viewing Profile</v-card-title
      >
      <v-card-text class="d-flex align-center flex-column">
        <div class="profile-table">
          <v-row>
            <v-col cols="12" md="6">
              Email
            </v-col>
            <v-col cols="12" md="6">
              {{ user.email }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              First Name
            </v-col>
            <v-col cols="12" md="6">
              {{ user.firstname }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              Last Name
            </v-col>
            <v-col cols="12" md="6">
              {{ user.lastname }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              School/Organization
            </v-col>
            <v-col cols="12" md="6">
              {{ user.organization }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              Role
            </v-col>
            <v-col cols="12" md="6">
              {{ user.role }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              Pronouns
            </v-col>
            <v-col cols="12" md="6">
              {{ user.pronouns }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              Discord
            </v-col>
            <v-col cols="12" md="6">
              {{ user.discord }}
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions
        ><v-spacer></v-spacer
        ><v-btn rounded depressed color="primary" @click="startEditing"
          >Edit</v-btn
        ></v-card-actions
      >
    </v-card>
    <v-card
      class="elevated rounded-xl width-400 ma-2"
      v-if="profileFormState == 'editing'"
      ><v-card-title class="d-flex justify-center"
        >Editing Profile</v-card-title
      >
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            v-model="email"
            label="email"
            dense
            rounded
            disabled
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
          <v-radio-group v-model="role" disabled class="pl-2">
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
            v-model="pronouns"
            label="Pronouns"
            color="primary"
            dense
            rounded
            filled
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="organization"
            label="School, Company, or Organization"
            color="primary"
            dense
            rounded
            filled
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="discord"
            label="Discord"
            dense
            rounded
            filled
            color="primary"
          ></v-text-field>
          <div class="d-flex justify-end">
            <v-btn
              rounded
              depressed
              color="primary"
              outlined
              @click="cancelEditing"
              >Cancel</v-btn
            ><v-spacer></v-spacer
            ><v-btn rounded depressed color="primary" @click="updateUser"
              >Save</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "ProfilePage",
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  methods: {
    startEditing() {
      this.email = this.user ? this.user.email : "";
      this.firstname = this.user ? this.user.firstname : "";
      this.lastname = this.user ? this.user.lastname : "";
      this.role = this.user ? this.user.role : "";
      this.organization = this.user ? this.user.organization : "";
      this.pronouns = this.user && this.user.pronouns ? this.user.pronouns : "";
      this.discord = this.user ? this.user.discord : "";
      this.profileFormState = "editing";
    },
    cancelEditing() {
      this.profileFormState = "viewing";
    },
    updateUser() {
      if (this.valid) {
        firebase
          .firestore()
          .collection("users")
          .doc(this.user.email)
          .set(
            {
              firstname: this.firstname,
              lastname: this.lastname,
              role: this.role,
              organization: this.organization,
              pronouns: this.pronouns,
              discord: this.discord
            },
            { merge: true }
          )
          .then(() => {
            this.$store.dispatch("setUser", {
              email: this.email,
              firstname: this.firstname,
              lastname: this.lastname,
              role: this.role,
              organization: this.organization,
              pronouns: this.pronouns,
              discord: this.discord
            });
            this.profileFormState = "viewing";
          });
      }
    }
  },
  data() {
    return {
      profileFormState: "viewing",
      valid: true,
      rules: {
        required: value => !!value || "Required",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail";
        }
      },
      email: this.user ? this.user.email : "",
      firstname: this.user ? this.user.firstname : "",
      lastname: this.user ? this.user.lastname : "",
      role: this.user ? this.user.role : "",
      organization: this.user ? this.user.organization : "",
      grad_year: null,
      discord: this.user ? this.user.discord : ""
    };
  }
};
</script>
