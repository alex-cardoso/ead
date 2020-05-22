<template>
    <li class="has_megamenu">
        <a href="/categories">Categorias</a>
        <div class="dropdown_megamenu contained">
            <div class="megamnu_module">
                <div class="menu_items">
                    <div class="menu_column">
                        <ul class="list-categories">
                            <li v-for="category in categories_data['rows']" :key="category['id']">
                                <a
                                    :href="`/category/${category['slug']}`"
                                >{{ category['name'] }} ({{ category['lessons'].length }})</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import http from '../http';

export default {
    data() {
        return {
            categories_data: [],
        };
    },

    mounted() {
        this.categories();
    },

    methods: {
        async categories() {
            try {
                const response = await http.get('/categories/data');

                this.categories_data = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
ul.list-categories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 0;
}

ul.list-categories li {
    cursor: pointer;
    list-style: none;
    border: solid 1px#efefef;
    width: 30%;
    margin-right: 5px;
    text-align: center;
    margin-bottom: 5px;
    border-radius: 5px;
}

ul.list-categories li a:hover {
    background-color: #6e4ff7;
    color: white !important;
}

.has_megamenu .dropdown_megamenu.contained {
    width: 700px !important;
}
</style>