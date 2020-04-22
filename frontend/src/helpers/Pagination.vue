<template>
    <b-pagination
        v-model="currentPage"
        :total-rows="count"
        :per-page="per_page"
        limit="7"
        first-text="Prim"
        prev-text="Ant"
        next-text="Próx"
        last-text="Últ"
        @input="change_page"
    />
</template>

<script>
import { scroll } from '../helpers';

export default {
    props: {
        count: {
            type: Number,
        },
        pages: {
            type: Number,
        },
        per_page: {
            type: Number,
        },
        current_page: {
            type: Number,
        },
    },
    data() {
        return {
            currentPage: this.current_page || 1,
        };
    },
    mounted() {
        let uri = window.location.search;
        let page_from_url = new URLSearchParams(uri).get('page');

        this.currentPage = page_from_url !== null ? parseInt(page_from_url) : 1;
    },

    methods: {
        change_page() {
            this.$emit('change_page', this.currentPage);

            history.pushState({}, '', `?page=${this.currentPage}`);

            setTimeout(() => {
                scroll('#app');
            }, 200);
        },
    },
};
</script>

<style scoped></style>
