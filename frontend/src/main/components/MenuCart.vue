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
                            <a href="#">
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
                    <a class="btn btn-outline-primary btn-sm" href="/cart">Checkout</a>
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
            lessons_in_cart: 0,
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
        this.lessons_in_cart = JSON.parse(localStorage.getItem('lessons'));
        this.get_lessons_in_cart();

        EventBus.$on('added_cart', lessons => {
            this.lessons_in_cart = lessons;
            this.get_lessons_in_cart();
        });
    },

    methods: {
        async get_lessons_in_cart() {
            try {
                console.log(this.lessons_in_cart);
                const response = await http.get('/cart/lessons', {
                    params: {
                        lessons: JSON.stringify(this.lessons_in_cart),
                    },
                });
                console.log(response.data);

                this.lessons = response.data;
            } catch (error) {
                console.log(error);
            }
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