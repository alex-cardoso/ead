<template>
    <div>
        <h2>Últimas aulas adicionadas</h2>
        <ul class="list-last-lessons">
            <li v-for="lesson in lessons['rows']" :key="lesson.id">
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
                    </template>
                </div>
                <div>
                    <span class="font-italic" style="font-size:14px;">
                        Postado
                        {{ moment(lesson['updatedAt']).fromNow() }} por {{ lesson['user']['name'] }} {{ lesson['user']['last_name'] }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import http from '../../http';
import truncate from 'truncate';
import moment from 'moment';

export default {
    props: {
        is_authenticated: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            lessons: [],
            truncate,
            moment,
        };
    },
    mounted() {
        this.latest_lessons();
        moment.locale('pt-br');
    },
    methods: {
        async latest_lessons() {
            try {
                const response = await http.get('/lessons/latest');
                this.lessons = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
ul.list-last-lessons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 0;
}

ul.list-last-lessons li {
    text-align: left !important;
    padding: 5px;
    list-style: none;
    border: solid 1px blue;
    width: 22%;
    margin-right: 5px;
    text-align: center;
    margin-bottom: 5px;
}
</style>
