import Vue from 'vue';
import babelPolyfill from 'babel-polyfill';

import Login from './components/Login';
import LessonsLatest from './components/LessonsLatest';
import Video from './components/Video';
import LessonsCategory from './components/LessonsCategory';

import filters from '../filters';

filters.moeda(Vue);

new Vue({
    el: '#app',
    components: {
        Login,
        'video-player-lesson': Video,
        'latest-lessons': LessonsLatest,
        'lessons-category': LessonsCategory,
    },
});
