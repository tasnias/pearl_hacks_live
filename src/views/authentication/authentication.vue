<template>
  <v-container class="full-height d-flex flex-column align-center">
    <span class="ph-logo-text d-flex mb-3 ph-logo"
      ><v-img
        alt="Pearl Hacks Logo"
        class="shrink mr-2"
        contain
        src="https://pearlhacks.github.io/2021Website/assets/images/phlogo.svg"
        width="30"
      /><b>Pearl Hacks</b>&nbsp;Live</span
    >
    <v-card rounded class="auth-card rounded-xl pa-4 elevated">
      <router-view />
    </v-card>
    <!-- TODO(tasnias): Add link. -->
    <a class="mt-4">Visit Pearl Hacks 2021 informational site</a>
  </v-container>
</template>

<script>
export default {
  name: "Authentication",
  data: () => ({})
};
</script>
<style lang="scss" scope>
.full-height {
  min-height: 90vh;
}

.auth-card {
  min-height: 40vh;
  width: 80vw !important;
  max-width: 425px !important;
}

.ph-logo {
  padding-top: 10vh !important;
}
</style>
