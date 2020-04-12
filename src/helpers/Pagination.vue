<template>
    <pagination v-model="currentPage" :total-page="pages" @change="change_page" boundary-links />
</template>

<script>
import { Pagination } from 'uiv';

export default {
    props: {
        count: {
            type: Number,
        },
        pages: {
            type: Number,
        },
    },
    components: {
        Pagination,
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    methods: {
        change_page() {
            this.$emit('change_page', this.currentPage);
        },
    },
};
</script>

<style scoped></style>
