import { Vue } from '../bootstrapVue';
import MenuCategories from '../helpers/MenuCategories';
import MenuCart from '../helpers/MenuCart';
import CategoriesList from './components/CategoriesList';

new Vue({
    el: '#app',
    components: {
        category: CategoriesList,
        'menu-categories': MenuCategories,
        'menu-cart': MenuCart,
    },
});
