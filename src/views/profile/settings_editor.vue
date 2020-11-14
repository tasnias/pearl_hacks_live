<template>
  <div class="d-flex justify-center justify-md-start">
    <v-card class="elevated rounded-xl" v-if="settingsFormState == 'viewing'">
      <v-card-title class="d-flex justify-center"
        >Viewing Settings</v-card-title
      >
      <v-card-text class="d-flex align-center flex-column">
        <div class="profile-table">
          <v-row>
            <v-col cols="12" md="6">
              Show me in the directory
            </v-col>
            <v-col cols="12" md="6">
              True
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
      v-if="settingsFormState == 'editing'"
      ><v-card-title class="d-flex justify-center"
        >Editing Settings</v-card-title
      >
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-radio-group v-model="role" class="pl-2">
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
  name: "SettingsEditor",
  computed: {
    settings() {
      return this.$store.getters.getUserSettings;
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
      this.settingsFormState = "editing";
    },
    cancelEditing() {
      this.settingsFormState = "viewing";
    },
    updateSettings() {
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
            this.settingsFormState = "viewing";
          });
      }
    }
  },
  data() {
    return {
      settingsFormState: "viewing",
      valid: true,
      rules: {
        required: value => !!value || "Required"
      },
      showMeInDirectory:
        this.settings && this.settings.showMeInDirectory
          ? this.settings.showMeInDirectory
          : true
    };
  }
};
</script>
