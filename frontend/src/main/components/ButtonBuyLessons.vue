<template>
    <button class="btn btn-outline-success" @click="buy" v-if="lessons.length > 0">Comprar aulas</button>
</template>

<script>
import http from '../../http';

export default {
    props: ['lessons', 'total'],

    methods: {
        async buy() {
            try {
                const response = await http.put('/lessons/buy', {
                    lessons: localStorage.getItem('lessons'),
                    total: this.total,
                });

                if (response.data === 'updated') {
                    this.$emit('updated');
                }
            } catch (error) {
                if (error.response !== undefined) {
                    this.$emit('error', error.response.data);
                }
                console.log(error);
            }
        },
    },
};
</script>