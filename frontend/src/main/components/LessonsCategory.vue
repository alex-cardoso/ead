<template>
    <div>
        <div class="container">
            <div class="row mt-5">
                <div class="col-lg-12">
                    <h2>{{ category_name }} ({{lessons_data['count']}})</h2>
                    <template v-if="lessons_data['count'] === 0">
                        <div class="mb-5">Nenhuma aula adicionada na categoria</div>
                    </template>
                    <div class="product-list">
                        <div class="tab-content" id="lp-tab-content">
                            <div
                                class="tab-pane fade show active"
                                id="tab1"
                                role="tabpanel"
                                aria-labelledby="tab-one"
                            >
                                <div class="row">
                                    <div
                                        class="col-lg-4 col-md-6"
                                        v-for="lesson in lessons_data['rows']"
                                        :key="lesson.id"
                                    >
                                        <div class="product-single latest-single">
                                            <div class="product-excerpt">
                                                <h5>
                                                    <a href>{{lesson.title}}</a>
                                                </h5>
                                                <ul class="titlebtm">
                                                    <li class="product_cat">
                                                        {{ truncate(lesson['description'], 70) }}
                                                        <a
                                                            :href="`/category/${lesson['category']['slug']}`"
                                                        >
                                                            postado em
                                                            {{lesson['category']['name']}} - {{ moment(lesson['updatedAt']).fromNow() }}
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul
                                                    class="product-facts clearfix justify-content-between"
                                                >
                                                    <li class="price">{{ lesson['value'] | moeda }}</li>
                                                    <li class="sells">
                                                        <span
                                                            class="icon-basket"
                                                            title="Quantas vezes foi adquirida"
                                                            style="cursor:pointer"
                                                        ></span>
                                                        {{ lesson['lessonBuyed'].length }}
                                                    </li>
                                                    <li class="product-fav">
                                                        <span class="icon-heart" title="Curtidas"></span>
                                                        {{ lesson['favorites'].length }}
                                                    </li>
                                                </ul>
                                                <div class="mt-2">
                                                    <hr />

                                                    <a
                                                        :href="`/lesson/${lesson['slug']}`"
                                                        class="btn btn--round btn-sm btn-outline-success w-100"
                                                    >
                                                        <i class="far fa-play-circle"></i> Assistir
                                                    </a>

                                                    <template
                                                        v-if="!lesson['userHasLesson'] && is_authenticated"
                                                    >
                                                        <button-add-cart
                                                            :lesson="lesson['id']"
                                                            class="mt-2"
                                                        ></button-add-cart>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <template v-if="lessons_data['count'] > lessons_data['per_page']">
                                    <pagination
                                        :count="lessons_data['count']"
                                        :pages="lessons_data['pages']"
                                        :per_page="lessons_data['per_page']"
                                        @change_page="lessons"
                                    ></pagination>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../../http';
import Pagination from '../../helpers/Pagination';
import moment from 'moment';
import truncate from 'truncate';
import ButtonAddCart from './ButtonAddCart';

export default {
    props: ['is_authenticated', 'slug'],

    data() {
        return {
            lessons_data: [],
            category_name: null,
            moment,
            truncate,
        };
    },

    components: {
        pagination: Pagination,
        'button-add-cart': ButtonAddCart,
    },

    mounted() {
        this.lessons();
    },

    methods: {
        async lessons(page = 1) {
            try {
                console.log(page);
                const response = await http.get('/category/lessons', {
                    params: {
                        page,
                        slug: this.slug,
                    },
                });

                this.lessons_data = response.data['lessons'];
                this.category_name = response.data['category'];
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
