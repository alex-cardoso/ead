import Vue from 'vue';

// Filters
import { filters } from '../filters';

// BootstrapVue
import { BPagination } from 'bootstrap-vue/esm/components/pagination/pagination';
import { BSpinner } from 'bootstrap-vue/esm/components/spinner/spinner';

Vue.component('b-pagination', BPagination);
Vue.component('b-spinner', BSpinner);

// Components
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
import Favorites from './components/Favorites';
import LessonsUser from './components/LessonsUser';
import ChangePassword from './components/ChangePassword';

// Vuex
import Vuex from 'vuex';
import vuexModules from './vuex/modules';

Vue.use(Vuex);

let store = new Vuex.Store({
    modules: vuexModules,
});

// Load Filters
filters.vueInstance(Vue);
filters.moeda();
filters.date();

// EventBus
window.EventBus = new Vue();

new Vue({
    el: '#app',
    store,
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
        favorites: Favorites,
        cart: Cart,
        profile: Profile,
        'lessons-user': LessonsUser,
        'change-password': ChangePassword,
    },
});
