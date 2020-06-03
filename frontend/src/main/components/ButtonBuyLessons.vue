<template>
    <button class="btn btn-primary" @click="buy" v-if="lessons.length > 0">
        <template v-if="buying">
            <b-spinner class="float-left mb-2"></b-spinner>
        </template>
        <template v-else>Comprar aulas</template>
    </button>
</template>

<script>
import http from '../../http';

export default {
    props: ['lessons', 'total'],

    data() {
        return {
            buying: false,
        };
    },

    methods: {
        async buy() {
            try {
                this.buying = true;
                const response = await http.put('/lessons/buy', {
                    lessons: localStorage.getItem('lessons'),
                    total: this.total,
                });

                if (response.data === 'updated') {
                    this.$emit('updated');
                    this.buying = false;
                }
            } catch (error) {
                this.buying = false;
                if (error.response !== undefined) {
                    this.$emit('error', error.response.data);
                }
            }
        },
    },
};
</script>