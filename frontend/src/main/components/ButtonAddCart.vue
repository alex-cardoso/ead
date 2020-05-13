<template>
    <div>
        <template v-if="!in_cart">
            <button class="btn btn--round btn-sm btn-info w-100" @click="add">
                <span class="icon-basket"></span> Colocar no carrinho
            </button>
        </template>
        <template v-else>
            <button class="btn btn--round btn-sm btn-secondary w-100" @click="remove">
                <span class="icon-basket"></span> Remover do carrinho
            </button>
        </template>
    </div>
</template>

<script>
export default {
    props: ['lesson'],

    data() {
        return {
            lessons: localStorage.getItem('lessons')
                ? JSON.parse(localStorage.getItem('lessons'))
                : [],
        };
    },

    mounted() {
        EventBus.$on('removed_lesson_cart', () => {
            this.lessons = JSON.parse(localStorage.getItem('lessons'));
        });
    },

    computed: {
        in_cart() {
            return this.lessons.includes(this.lesson);
        },
    },

    methods: {
        add() {
            if (this.in_cart) {
                return false;
            }

            this.lessons = localStorage.getItem('lessons')
                ? JSON.parse(localStorage.getItem('lessons'))
                : [];

            this.lessons.push(this.lesson);

            EventBus.$emit('added_cart', this.lessons);

            localStorage.setItem('lessons', JSON.stringify(this.lessons));
        },

        remove() {
            this.lessons = JSON.parse(localStorage.getItem('lessons'));

            const index = this.lessons.findIndex(
                lesson => lesson === this.lesson
            );

            this.lessons.splice(index, 1);

            EventBus.$emit('added_cart', this.lessons);

            localStorage.setItem('lessons', JSON.stringify(this.lessons));
        },
    },
};
</script>