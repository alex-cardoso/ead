<template>
    <button class="btn btn-outline-success" @click="buy">Comprar aulas</button>
</template>

<script>
export default {
    props: ['lessons', 'total'],

    methods: {
        buy() {
            console.log(this.lessons, this.total);
        },
    },
};
</script>