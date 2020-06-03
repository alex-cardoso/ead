<template>
    <div>
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-title">
                        <h1>Categorias({{ categories_data['count'] }})</h1>
                        <p>Abaixo estão todas as categorias existentes no portal, escolha a que deseja e aproveite pois todas as aulas são gratuitas.</p>
                        <p>Se quiser me ajudar a continuar criando cada vez mais conteúdo gratuito, compre a aula que desejar.</p>
                    </div>
                </div>
                <div class="col-lg-12 mb-5">
                    <ul class="list-lessons-category">
                        <li v-for="category in categories_data['rows']" :key="category.id">
                            <a
                                :href="`category/${category['slug']}`"
                            >{{ category['name'] }} ({{ category['lessons'].length }})</a>
                        </li>
                    </ul>

                    <template v-if="categories_data['count'] > categories_data['per_page']">
                        <pagination
                            :count="categories_data['count']"
                            :pages="categories_data['pages']"
                            :per_page="categories_data['per_page']"
                            @change_page="categories"
                            class="mt-5"
                        ></pagination>
                    </template>
                </div>
            </div>
        </div>
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

<style scoped>
ul.list-lessons-category {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 0;
    justify-content: center;
}

ul.list-lessons-category li {
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
    list-style: none;
    border: solid 1px#efefef;
    width: 25%;
    margin-right: 5px;
    text-align: center;
    margin-bottom: 5px;
    border-radius: 5px;
}

ul.list-lessons-category li:hover a {
    background-color: #6e4ff7;
    color: white !important;
    padding: 10px;
}
</style>