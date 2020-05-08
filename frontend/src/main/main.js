import Vue from 'vue';

import { filters } from '../filters';

import { BPagination } from 'bootstrap-vue/esm/components/pagination/pagination';
import { BSpinner } from 'bootstrap-vue/esm/components/spinner/spinner';

import ButtonBuyLesson from './components/ButtonBuyLesson';
import CategoriesList from './components/CategoriesList';
import ForumLesson from './components/ForumLesson';
import LessonsCategory from './components/LessonsCategory';
import LessonsLatest from './components/LessonsLatest';
import LessonsVideoCategory from './components/LessonsVideoCategory';
import Login from './components/Login';
import Search from './components/Search';
import Signup from './components/Signup';
import Video from './components/Video';
import Contact from './components/Contact';
import BuyCredits from './components/BuyCredits';
import ButtonAddCart from './components/ButtonAddCart';
import Cart from './components/Cart';
import Profile from './components/Profile';
import MenuCategories from './components/MenuCategories';
import MenuCart from './components/MenuCart';

filters.vueInstance(Vue);
filters.moeda();
filters.date();

Vue.component('b-pagination', BPagination);
Vue.component('b-spinner', BSpinner);

window.EventBus = new Vue();

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
        search: Search,
        signup: Signup,
        contact: Contact,
        'buy-credits': BuyCredits,
        'button-add-cart': ButtonAddCart,
        'menu-categories': MenuCategories,
        'menu-cart': MenuCart,
        cart: Cart,
        profile: Profile,
    },
});
