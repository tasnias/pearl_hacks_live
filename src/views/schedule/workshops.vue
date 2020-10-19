<template>
  <div>
    <h2 class="heading py-3 pb-2 text-center">
      Workshops
    </h2>
    <main class="pb-5 pt-7">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        hide-default-footer
        class="elevated rounded-xl"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pl-10 expanded-row">
            <p class="pt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, culpa saepe sed exercitationem voluptatibus aliquam
              quo, neque praesentium sapiente perspiciatis impedit dolorum
              distinctio excepturi velit itaque optio repellendus explicabo eos?
            </p>
            <p>Hosted By:</p>
            <p>Tags: {{ item.iron }}</p>
            <p>Downloads: {{ item.iron }}</p>
          </td>
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
      expanded: [],
      headers: [
        {
          text: "Title",
          value: "name"
        },
        { text: "Time", value: "calories" },
        { text: "Link", value: "fat" },
        { text: "Difficulty", value: "carbs" },
        { text: "", value: "data-table-expand" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scope>
.v-divider {
  max-width: auto !important;
}

.v-application .elevated {
  box-shadow: 0 2px 5px rgba(75, 75, 75, 0.2) !important;
}

td,
th {
  border-color: rgba(194, 194, 194, 0.25) !important;
}

tr:hover {
  background-color: transparent !important;
  box-shadow: 0 1px 6px rgba(99, 99, 99, 0.25);
  transition: 0.25s all;
}
</style>
