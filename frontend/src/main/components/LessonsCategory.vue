<template>
    <div>
        <h2>Lessons</h2>

        <template v-if="!lessons_data['rows'].length">Nenhuma aula encontrada nessa categoria</template>

        <ul class="list-lessons">
            <li v-for="lesson in lessons_data['rows']" :key="lesson.id">
                <div class="mb-2">{{ lesson['title'] }}</div>
                <div>{{ truncate(lesson['description'], 50) }}</div>
                <div class="mt-2 mb-2 pt-2 pb-2" style="background-color:#efefef;">
                    {{ lesson['value'] | moeda }}
                    <br />

                    <template v-if="lesson['lessonBuyed'].length">
                        <a
                            :href="`/lesson/${lesson['slug']}`"
                            class="btn btn-outline-success btn-sm mt-2"
                        >
                            <i class="far fa-play-circle"></i> Assistir
                        </a>
                    </template>
                    <template v-else>
                        <button class="btn btn-outline-info btn-sm mt-2" v-if="is_authenticated">
                            <i class="fas fa-money-check-alt"></i> Comprar
                        </button>
                        <a
                            :href="`/lesson/${lesson['slug']}`"
                            class="btn btn-outline-danger btn-sm mt-2"
                        >
                            <i class="far fa-play-circle"></i> Detalhes
                        </a>
                        <button-add-cart :lesson="lesson['id']"></button-add-cart>
                    </template>
                </div>
                <div>
                    <span class="font-italic" style="font-size:14px;">
                        Postado
                        {{ moment(lesson['updatedAt']).fromNow() }} por
                        {{ lesson['user']['name'] }}
                        {{ lesson['user']['last_name'] }}
                    </span>
                </div>
            </li>
        </ul>
        <template v-if="lessons_data['count'] > lessons_data['per_page']">
            <pagination
                :count="lessons_data['count']"
                :pages="lessons_data['pages']"
                :per_page="lessons_data['per_page']"
                @change_page="lessons"
            ></pagination>
        </template>
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
        async lessons(page) {
            try {
                const response = await http.get('/category/lessons', {
                    params: {
                        page,
                        slug: this.slug,
                    },
                });

                this.lessons_data = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
