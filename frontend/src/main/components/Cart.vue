<template>
    <div v-if="loaded">
        <h2>Cart</h2>

        <table class="table table-striped w-100">
            <thead>
                <tr>
                    <th>Aula</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="!lessons.length">
                    <tr>
                        <td colspan="2">Nenhuma aula adicionada ao carrinho.</td>
                    </tr>
                </template>
                <tr v-for="(lesson, index) in lessons" :key="lesson.id">
                    <td>{{lesson.title}}</td>
                    <td>
                        {{lesson.value | moeda}}
                        <button
                            class="btn btn-outline-danger btn-sm"
                            @click="remove(lesson, index)"
                        >Remover</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Total: {{ total_lessons_in_cart | moeda }}</td>
                    <td>
                        <button-buy-lessons
                            :lessons="lessons_in_cart"
                            :total="total_lessons_in_cart"
                        ></button-buy-lessons>
                    </td>
                </tr>
            </tfoot>
        </table>
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
        };
    },

    components: {
        'button-buy-lessons': ButtobBuyLessons,
    },

    mounted() {
        this.get_lessons_in_cart();
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
        },
    },
};
</script>