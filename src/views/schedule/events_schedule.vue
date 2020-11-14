<template>
  <div>
    <main class="pb-5">
      <div v-for="day in schedule" :key="day.id" class="">
        <h3 class="pb-2 pt-7 text-center">{{ Object.keys(day)[0] }}</h3>
        <div class="d-flex justify-center">
          <v-data-table
            :headers="headers"
            :items="Object.values(day)[0]"
            item-key="name"
            hide-default-footer
            hide-default-header
            class="elevation-0 rounded-xl events-table mb-5"
          >
          </v-data-table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "EventsSchedule",
  data() {
    return {
      headers: [
        { text: "Time", value: "Time" },
        {
          text: "Event",
          value: "Event"
        }
      ]
    };
  },
  computed: {
    schedule() {
      return this.$store.getters.getFullSchedule;
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadFullSchedule", false);
  }
};
</script>
<style lang="scss" scope>
@import "../../styles/variables.scss";
.v-divider {
  max-width: auto !important;
}

td,
th {
  border-bottom: thin solid $borderColor !important;
}

tr:hover {
  background-color: transparent !important;
  box-shadow: 0 1px 6px rgba(99, 99, 99, 0.25);
  transition: 0.25s all;
}

.events-table {
  width: 90vw !important;
  max-width: 600px !important;
  // TODO: use a mobile breakpoint for full width otherwise 35%
  tr td:first-of-type {
    width: 50% !important;
    // min-width: 250px;
    text-align: center !important;
  }
}
</style>
