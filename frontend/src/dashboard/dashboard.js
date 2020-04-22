import Vue from 'vue';
import filters from '../filters';
import VModal from 'vue-js-modal';

Vue.use(VModal);

filters.moeda(Vue);

// components
import Lessons from './components/Lessons';

new Vue({
    el: '#app',
    components: {
        Lessons,
    },
});
