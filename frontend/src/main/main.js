import Vue from 'vue';

import Login from './components/Login';
import LessonsLatest from './components/LessonsLatest';
import Video from './components/Video';
import LessonsVideoCategory from './components/LessonsVideoCategory';
import CategoriesList from './components/CategoriesList';
import LessonsCategory from './components/LessonsCategory';
import ForumLesson from './components/ForumLesson';
import ButtonBuyLesson from './components/ButtonBuyLesson';
import Search from './components/Search';
import { BPagination } from 'bootstrap-vue/esm/components/pagination/pagination';

Vue.component('b-pagination', BPagination);

import filters from '../filters';

filters.moeda(Vue);
filters.date(Vue);

new Vue({
    el: '#app',
    components: {
        Login,
        'video-player-lesson': Video,
        'lessons-latest': LessonsLatest,
        'lessons-video-category': LessonsVideoCategory,
        'lessons-category': LessonsCategory,
        'forum-lesson': ForumLesson,
        'button-buy-lesson': ButtonBuyLesson,
        'categories-list': CategoriesList,
        'search': Search
    },
});
