<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-lg-12">
                <h2>Minhas aulas ({{lessons['count']}})</h2>
                <template v-if="lessons['count'] === 0">
                    <div class="mb-5">Nenhuma aula adquirida até o momento.</div>
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
                                    v-for="lesson in lessons['rows']"
                                    :key="lesson.id"
                                >
                                    <div class="product-single latest-single">
                                        <div class="product-excerpt">
                                            <h5>
                                                <a href>{{lesson['lesson'].title}}</a>
                                            </h5>
                                            <ul class="titlebtm">
                                                <li class="product_cat">
                                                    {{ truncate(lesson['lesson']['description'], 70) }}
                                                    <a
                                                        :href="`/category/${lesson['lesson']['category']['slug']}`"
                                                    >
                                                        postado em
                                                        {{lesson['lesson']['category']['name']}} - {{ moment(lesson['lesson']['updatedAt']).fromNow() }}
                                                    </a>
                                                </li>
                                            </ul>
                                            <ul
                                                class="product-facts clearfix justify-content-between"
                                            >
                                                <li
                                                    class="price"
                                                >{{ lesson['lesson']['value'] | moeda }}</li>
                                                <li class="sells">
                                                    <span
                                                        class="icon-basket"
                                                        title="Quantas vezes foi adquirida"
                                                        style="cursor:pointer"
                                                    ></span>
                                                    {{ lesson['lesson']['lessonBuyed'].length }}
                                                </li>
                                                <li class="product-fav">
                                                    <span class="icon-heart" title="Curtidas"></span>
                                                    {{ lesson['lesson']['favorites'].length }}
                                                </li>
                                            </ul>
                                            <div class="mt-2">
                                                <hr />

                                                <a
                                                    :href="`/lesson/${lesson['lesson']['slug']}`"
                                                    class="btn btn--round btn-sm btn-outline-success w-100"
                                                >
                                                    <i class="far fa-play-circle"></i> Assistir
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template v-if="lessons['count'] > lessons['per_page']">
                                <pagination
                                    :count="lessons['count']"
                                    :pages="lessons['pages']"
                                    :per_page="lessons['per_page']"
                                    @change_page="get_lessons"
                                ></pagination>
                            </template>
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
import truncate from 'truncate';
import moment from 'moment';

export default {
    data() {
        return {
            lessons: [],
            truncate,
            moment,
        };
    },

    components: {
        pagination: Pagination,
    },

    mounted() {
        this.get_lessons();
    },

    methods: {
        async get_lessons(page = 1) {
            try {
                const response = await http.get('/my/lessons/data', {
                    params: {
                        page,
                    },
                });

                console.log(response.data);

                this.lessons = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
