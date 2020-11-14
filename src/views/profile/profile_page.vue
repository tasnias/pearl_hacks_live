<template>
  <div>
    <h1 class="heading py-5 text-center">
      Manage Your Account
    </h1>
    <main class="pb-5 d-flex justify-center profile">
      <v-row>
        <v-col col="12" md="6">
          <profile-editor></profile-editor>
        </v-col>
        <v-col col="12" md="6">
          <settings-editor></settings-editor>
        </v-col>
      </v-row>
    </main>
  </div>
</template>

<script>
import ProfileEditor from "./profile_editor";
import SettingsEditor from "./settings_editor";
export default {
  name: "ProfilePage",
  components: {
    "profile-editor": ProfileEditor,
    "settings-editor": SettingsEditor
  }
};
</script>
<style lang="scss" scope>
@import "../../styles/variables.scss";
.profile .v-card {
  width: 400px;
}

.profile-table {
  width: 300px;
  max-width: 90vw;
  .row > div:first-of-type {
    font-weight: 600 !important;
  }
  .row {
    border-bottom: thin solid $borderColor;
  }
}
</style>
