<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    v-if="user"
    clipped
    class="elevation-0 grey lighten-5"
  >
    <v-list floating dense rounded>
      <v-list-item-group>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item to="/schedule">
          <v-list-item-icon>
            <v-icon>mdi-calendar-range</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Schedule</v-list-item-title>
        </v-list-item>

        <v-list-item to="/mentor_hub">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Mentor Hub</v-list-item-title>
        </v-list-item>

        <v-list-item to="/faq">
          <v-list-item-icon>
            <v-icon>mdi-help-rhombus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>More Resources</v-list-item-title>
        </v-list-item>

        <v-list-item to="/directory">
          <v-list-item-icon>
            <v-icon>mdi-account-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Directory</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "NavigationDrawer",
  computed: {
    user() {
      return this.$store.getters.getCurrentUser;
    },
    drawer() {
      return this.$store.getters.getNavDrawerState;
    }
  }
};
</script>
