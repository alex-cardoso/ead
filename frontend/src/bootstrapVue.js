import Vue from 'vue';

// Filters
import { filters } from './filters';

// BootstrapVue
import { BPagination } from 'bootstrap-vue/esm/components/pagination/pagination';
import { BSpinner } from 'bootstrap-vue/esm/components/spinner/spinner';

Vue.component('b-pagination', BPagination);
Vue.component('b-spinner', BSpinner);

// Load Filters
filters.vueInstance(Vue);
filters.moeda();
filters.date();

// EventBus
window.EventBus = new Vue();

export { Vue };
