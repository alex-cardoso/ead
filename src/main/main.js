import Vue from 'vue';
import babelPolyfill from 'babel-polyfill';

import Login from './components/Login';
import LessonsLatest from './components/LessonsLatest';

import filters from '../filters';

filters.moeda(Vue);

new Vue({
    el: '#app',
    components: {
        Login,
        'latest-lessons': LessonsLatest,
    },
});
