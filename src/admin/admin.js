import Vue from "vue";
import babelPolyfill from "babel-polyfill";

import Login from "./components/Login";

new Vue({
  el: "#app",
  components: {
    Login
  }
});
