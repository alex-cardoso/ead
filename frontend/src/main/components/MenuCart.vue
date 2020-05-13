<template>
    <li class="has_dropdown">
        <div class="icon_wrap">
            <a href="/cart">
                <span class="icon-basket-loaded"></span>
                <span class="notification_count purch">{{lessons_in_cart.length}}</span>
            </a>
        </div>
        <div class="dropdown dropdown--cart">
            <div class="cart_area" :class="{height_no_lessons:lessons_in_cart.length <= 2}">
                <div class="cart_list">
                    <div class="cart_product" v-for="(lesson, index) in lessons" :key="index">
                        <div class="product__info">
                            <div class="info">
                                <a class="title" :href="`/lesson/${lesson.slug}`">{{lesson.title}}</a>
                                <div class="cat">
                                    <a
                                        :href="`/category/${lesson['category']['slug']}`"
                                    >postado em {{ lesson['category']['name'] }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="product__action">
                            <a href="#" @click.prevent="remove(lesson,index)">
                                <span class="icon-trash"></span>
                            </a>
                            <p>{{lesson.value | moeda}}</p>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <p>
                        <span>Total :</span>
                        {{ total_lessons_in_cart | moeda }}
                    </p>
                </div>
                <div class="cart_action">
                    <template v-if="total_lessons_in_cart <= 0">
                        <a class="btn btn-outline-danger btn-sm" href="#">Adicione aulas no carrinho</a>
                    </template>
                    <template v-else>
                        <a class="btn btn-outline-primary btn-sm" href="/cart">Checkout</a>
                    </template>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import http from '../../http';

export default {
    data() {
        return {
            lessons_in_cart: [],
            lessons: [],
        };
    },

    computed: {
        total_lessons_in_cart() {
            return this.lessons.reduce((current, { value }) => {
                return parseFloat(current) + parseFloat(value);
            }, 0);
        },
    },

    mounted() {
        this.lessons_in_cart = localStorage.getItem('lessons')
            ? JSON.parse(localStorage.getItem('lessons'))
            : [];
        this.get_lessons_in_cart();

        EventBus.$on('added_cart', lessons => {
            this.lessons_in_cart = lessons;
            this.get_lessons_in_cart();
        });

        EventBus.$on('removed_lesson_cart', index => {
            this.lessons.splice(index, 1);
            this.get_lessons_in_cart();
        });

        EventBus.$on('empty_cart', () => {
            this.lessons_in_cart = [];
            this.get_lessons_in_cart();
        });
    },

    methods: {
        async get_lessons_in_cart() {
            try {
                const response = await http.get('/cart/lessons', {
                    params: {
                        lessons: JSON.stringify(this.lessons_in_cart),
                    },
                });

                this.lessons = response.data;
            } catch (error) {
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
    },
};
</script>

<style scoped>
.info {
    width: 100% !important;
}

.cart_area {
    overflow: scroll;
    height: 450px;
}

.height_no_lessons {
    height: auto;
    overflow: hidden;
}
</style>