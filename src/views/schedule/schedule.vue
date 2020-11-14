<template>
  <div>
    <h1 class="heading py-5 text-center">
      Schedule
    </h1>
    <v-tabs show-arrows class="mt-n5">
        <v-tab :to="{ name: 'EventsSchedule' }">
          Events
        </v-tab>
        <v-tab :to="{ name: 'Workshops' }">
          Workshops
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
    <main class="pb-5">
      

      <router-view />
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

.v-tab {
  font-weight: 600 !important;
}
</style>
