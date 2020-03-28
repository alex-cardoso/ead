import Vue from "vue";
import babelPolyfill from "babel-polyfill";
import filters from "../filters";
import VModal from "vue-js-modal";
import * as uiv from "uiv";

Vue.use(uiv);
Vue.use(VModal);

filters.moeda(Vue);

// components
import Lessons from "./components/Lessons";

new Vue({
  el: "#app",
  components: {
    Lessons
  }
});
