<template>
  <div>
    <h2 class="heading py-3 pb-2 text-center">
      Schedule
    </h2>
    <main class="pt-1 pb-5">
      <v-tabs fixed-tabs show-arrows class="grey lighten-5">
        <v-tab>
          Events Schedule
        </v-tab>
        <v-tab>
          Workshops
        </v-tab>
      </v-tabs>
    </main>
  </div>
</template>
<script>
export default {
  name: "Schedule",
  data: () => ({}),
  methods: {}
};
</script>
<style lang="scss" scope>
.theme--light.v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}
</style>
