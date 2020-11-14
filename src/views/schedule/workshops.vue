<template>
  <div>
    <main class="py-5">
      <v-data-table
        :headers="headers"
        :items="workshops"
        :expanded.sync="expanded"
        :search="search"
        show-expand
        item-key="ID"
        hide-default-footer
        disable-pagination
        class="elevation-0 rounded-xl"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pl-10 expanded-row">
            <p>{{ item["Workshop Description"] }}</p>
            <p><b>Hosted By</b>: {{ item["Host"] }} - {{ item["Company"] }}</p>
            <p><b>Tags</b>: {{ item["Workshop Tags"] }}</p>
            <p><b>Downloads</b>: {{ item["Software"] }}</p>
          </td>
        </template>
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4 pt-5"
            filled
            rounded
          ></v-text-field>
        </template>
      </v-data-table>
    </main>
  </div>
</template>

<script>
export default {
  name: "Workshops",
  data() {
    return {
      search: "",
      expanded: [],
      headers: [
        {
          text: "Workshop Title",
          value: "Workshop Title"
        },
        { text: "Time", value: "Time" },
        { text: "Difficulty", value: "Level" },
        { text: "", value: "data-table-expand" }
      ]
    };
  },
  computed: {
    workshops() {
      return this.$store.getters.getAllWorkshops;
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadAllWorkshops");
  }
};
</script>
<style lang="scss" scope>
.v-divider {
  max-width: auto !important;
}

tr:hover {
  background-color: transparent !important;
  box-shadow: 0 1px 6px rgba(99, 99, 99, 0.25);
  transition: 0.25s all;
}

.expanded-row {
  background-color: white !important;
}

.v-data-table__expanded.v-data-table__expanded__row td {
  border: none !important;
  // background-color: red !important;
}
</style>
