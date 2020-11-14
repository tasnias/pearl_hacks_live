<template>
  <div>
    <h1 class="text-center py-5 heading">FAQ</h1>
    <main class="mt-n5">
      <v-tabs show-arrows>
        <v-tab>
          FAQs
        </v-tab>
        <v-tab>
          Guidelines
        </v-tab>
        <v-tab>
          Hacking Resources
        </v-tab>
        <v-tab>
          Mentorship Resources
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <div v-for="faq_set in faqs" :key="faq_set.id">
        <h3 class="pb-2 pt-4 pl-3">{{ faq_set.title }}</h3>
        <v-expansion-panels multiple flat>
          <v-expansion-panel
            v-for="question in faq_set.data"
            :key="question.id"
            class="rounded-xl elevated"
          >
            <v-expansion-panel-header>
              <h4>
                {{ question["Question"] }}
              </h4>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <span v-html="question['Answer']"></span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <h2 class="text-center mb-5">
        Have more questions? Ask them on <a>Discord</a>
      </h2>
    </main>
  </div>
</template>

<script>
export default {
  name: "FAQ",
  computed: {
    faqs() {
      return this.$store.getters.getAllFAQs;
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadAllFAQs");
  }
};
</script>
<style lang="scss" scope>
@import "../../styles/variables.scss";
.v-expansion-panel {
  margin-bottom: 1rem;
  border-radius: 0.25rem !important;
  border: 0px solid $info-color !important;

  h4 {
    color: $primary-color !important;
    font-size: large;
    font-weight: 500;
  }
}

.v-expansion-panel:not(:first-child):after {
  border: none !important;
}
</style>
