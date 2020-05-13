<template>
    <div v-if="loaded">
        <section class="cart_area section--padding bgcolor">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="product_archive added_to__cart">
                            <div class="table-responsive single_product">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                <h4>Aula</h4>
                                            </th>
                                            <th scope="col">
                                                <h4>Categoria</h4>
                                            </th>
                                            <th scope="col">
                                                <h4>Preço</h4>
                                            </th>
                                            <th scope="col">
                                                <h4>Remover</h4>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="!lessons.length">
                                            <td colspan="4">Nenhuma aula no carrinho</td>
                                        </tr>
                                        <tr v-for="(lesson,index) in lessons" :key="lesson.id">
                                            <td colspan="1">
                                                <div class="product__description">
                                                    <div class="short_desc">
                                                        <a :href="`/lesson/${lesson['slug']}`">
                                                            <h6>{{lesson['title']}}</h6>
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <a
                                                    :href="`/category/${lesson['category']['slug']}`"
                                                    class="category"
                                                >{{lesson['category']['name']}}</a>
                                            </td>
                                            <td>
                                                <div class="item_price">
                                                    <span>{{lesson['value'] | moeda}}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="item_action">
                                                    <a
                                                        href="#"
                                                        @click.prevent="remove(lesson,index)"
                                                        class="remove_from_cart"
                                                    >
                                                        <span class="icon-trash"></span>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="row">
                                <div class="col-md-6 offset-md-6">
                                    <div class="cart_calculation text-right" v-if="!message">
                                        <div class="cart--total">
                                            <p>
                                                <span>total</span>
                                                {{ total_lessons_in_cart | moeda }}
                                            </p>
                                        </div>
                                        <button-buy-lessons
                                            :lessons="lessons_in_cart"
                                            :total="total_lessons_in_cart"
                                            @updated="updated"
                                            @error="error"
                                        ></button-buy-lessons>
                                    </div>
                                    <div v-else class="mt-4" v-html="message"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import http from '../../http';
import ButtobBuyLessons from './ButtonBuyLessons';
export default {
    data() {
        return {
            lessons_in_cart: localStorage.getItem('lessons') || [],
            lessons: [],
            total: 0,
            loaded: false,
            message: null,
        };
    },

    components: {
        'button-buy-lessons': ButtobBuyLessons,
    },

    mounted() {
        this.get_lessons_in_cart();

        EventBus.$on('removed_lesson_cart', index => {
            this.lessons.splice(index, 1);
            this.get_lessons_in_cart();
        });
    },

    computed: {
        total_lessons_in_cart() {
            return this.lessons.reduce((current, { value }) => {
                return parseFloat(current) + parseFloat(value);
            }, 0);
        },
    },

    methods: {
        async get_lessons_in_cart() {
            try {
                const response = await http.get('/cart/lessons', {
                    params: {
                        lessons: this.lessons_in_cart,
                    },
                });

                this.lessons = response.data;

                this.loaded = true;
            } catch (error) {
                this.loaded = true;
                console.log(error);
            }
        },

        remove(lesson, index_from_list_lessons) {
            this.lessons_in_cart = JSON.parse(localStorage.getItem('lessons'));

            const index_from_lessons_in_cart = this.lessons_in_cart.findIndex(
                lesson_from_cart => {
                    return lesson_from_cart === lesson['id'];
                }
            );

            this.lessons.splice(index_from_list_lessons, 1);
            this.lessons_in_cart.splice(index_from_lessons_in_cart, 1);

            localStorage.setItem(
                'lessons',
                JSON.stringify(this.lessons_in_cart)
            );

            EventBus.$emit('removed_lesson_cart', index_from_list_lessons);
        },

        updated() {
            localStorage.removeItem('lessons');
            this.lessons = [];
            this.lessons_in_cart = [];
            this.message = `<div class="alert alert-success" role="alert">Aula(s) adquirida(s) com sucesso !</div>`;
            EventBus.$emit('empty_cart');

            setTimeout(() => {
                this.message = null;
            }, 3000);
        },

        error(error) {
            if (error === 'not_logged_in') {
                this.message = `<div class="alert alert-danger">Tem que logar antes de comprar a(s) aula(s) escolhida(s).</div>`;
            }

            if (error === 'no_credits') {
                this.message = `<div class="alert alert-danger">Você não tem créditos para comprar essa(s) aula(s)</div>`;
            }
            setTimeout(() => {
                this.message = null;
            }, 3000);
        },
    },
};
</script>