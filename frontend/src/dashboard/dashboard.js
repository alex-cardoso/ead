import Vue from 'vue';
import VModal from 'vue-js-modal';
import { filters } from '../filters';
// components
import Lessons from './components/Lessons';

Vue.use(VModal);

filters.vueInstance(Vue);
filters.moeda();
filters.date();

new Vue({
    el: '#app',
    components: {
        Lessons,
    },
});
