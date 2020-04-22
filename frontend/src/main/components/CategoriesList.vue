<template>
    <div>
        <h2>Categories</h2>

        <ul class="list-lessons">
            <li
                v-for="category in categories_data['rows']"
                :key="category.id"
                class="mb-2 w-20 border"
            >
                {{ category['name'] }} <br />
                <a :href="`category/${category['slug']}`">Ir para categoria</a>
            </li>
        </ul>

        <template v-if="categories_data['count'] > categories_data['per_page']">
            <pagination
                :count="categories_data['count']"
                :pages="categories_data['pages']"
                :per_page="categories_data['per_page']"
                @change_page="categories"
            ></pagination>
        </template>
    </div>
</template>

<script>
import http from '../../http';
import Pagination from '../../helpers/Pagination';

export default {
    data() {
        return {
            categories_data: [],
        };
    },

    components: {
        pagination: Pagination,
    },

    mounted() {
        this.categories();
    },

    methods: {
        async categories(page) {
            try {
                const response = await http.get('/categories/data', {
                    params: {
                        page,
                    },
                });
                this.categories_data = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
