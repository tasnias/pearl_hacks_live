<template>
  <div>
    <h2 class="text-center py-3 pb-2 heading">FAQ</h2>
    <main>
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
              {{ question["Answer"] }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <h2 class="text-center">
        Have more questions? Ask them on <a>Discord</a>
      </h2>
    </main>
  </div>
</template>

<script>
import FaqService from "../services/faq_service";

export default {
  name: "FAQ",
  data: () => ({
    faqs: []
  }),
  created() {
    const faqService = new FaqService();
    this.faqs = faqService.getAllFaqs();
  }
};
</script>
<style lang="scss" scope>
@import "../styles/variables.scss";
.heading {
  // background-color: $info-color !important;
  color: $primary-color !important;
  // border-bottom: 2px solid $info-color !important;
  margin: -1rem !important;
  font-family: $heading-font-family;
}

.v-expansion-panel {
  margin-bottom: 1rem;
  border-radius: 0.25rem !important;
  border: 0px solid $info-color !important;

  h4 {
    color: $primary-color !important;
    font-size: large;
    font-weight: normal;
  }
}

.v-expansion-panel:not(:first-child):after {
  border: none !important;
}

.v-application .elevated {
  box-shadow: 0 2px 5px rgba(75, 75, 75, 0.2) !important;
}
</style>
