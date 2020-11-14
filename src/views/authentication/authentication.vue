<template>
  <v-container class="full-height d-flex flex-column align-center">
    <span class="ph-logo-text d-flex mb-3 ph-logo"
      ><v-img
        alt="Pearl Hacks Logo"
        class="shrink mr-2"
        contain
        src="~@/assets/logo.png"
        width="30"
      /><b>Pearl Hacks</b>&nbsp;Live</span
    >
    <v-card rounded class="auth-card rounded-xl pa-4 elevated">
      <router-view />
    </v-card>
    <a class="mt-4 text-center" href="https://pearlhacks.com" target="_blank"
      >Visit pearlhacks.com</a
    >
  </v-container>
</template>

<script>
export default {
  name: "Authentication"
};
</script>
<style lang="scss" scope>
.full-height {
  min-height: 95vh;
}

.auth-card {
  width: 90vw !important;
  max-width: 425px !important;
}

.ph-logo {
  padding-top: 5vh !important;
}
</style>
