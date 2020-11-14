import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#3ea381",
        secondary: "#d86c91",
        accent: "#fbccd4",
        error: "#ff5454",
        info: "#c7f0c3",
        success: "#3ea381",
        warning: "#FFC107"
      }
    }
  }
});
