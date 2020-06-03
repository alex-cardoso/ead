import { Vue } from '../bootstrapVue';
// Components
import CategoriesList from './components/CategoriesList';
import ForumLesson from './components/ForumLesson';
import LessonsCategory from './components/LessonsCategory';
import LessonsLatest from './components/LessonsLatest';
import LessonsVideoCategory from './components/LessonsVideoCategory';
import Login from './components/Login';
import Search from './components/Search';
import Signup from './components/Signup';
import Contact from './components/Contact';
import BuyCredits from './components/BuyCredits';
import ButtonAddCart from './components/ButtonAddCart';
import Cart from './components/Cart';
import Profile from './components/Profile';
import MenuCategories from '../helpers/MenuCategories';
import MenuCart from '../helpers/MenuCart';
import Favorites from './components/Favorites';
import LessonsUser from './components/LessonsUser';
import ChangePassword from './components/ChangePassword';
import Lesson from './components/Lesson';

new Vue({
    el: '#app',
    components: {
        Login,
        'lessons-latest': LessonsLatest,
        'lessons-video-category': LessonsVideoCategory,
        'lessons-category': LessonsCategory,
        'forum-lesson': ForumLesson,
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
        lesson: Lesson,
    },
});
