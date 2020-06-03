<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-title">
                        <h1>TheCoding</h1>
                        <p>
                            Todas nosass aulas são gratuitas, mas caso queira ter acesso ao fórum exclusivo de cada aula e material exclusivo, e claro, se quiser me ajudar a continuar criando
                            cada vez mais conteúdo gratuito, compre a aula que desejar.
                        </p>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="product-list">
                        <div class="row">
                            <div
                                class="col-lg-4 col-md-6"
                                v-for="lesson in lessons"
                                :key="lesson.id"
                            >
                                <div class="product-single latest-single">
                                    <div class="product-excerpt">
                                        <h5>
                                            <a :href="`/lesson/${lesson['slug']}`">{{lesson.title}}</a>
                                        </h5>
                                        <ul class="titlebtm">
                                            <li class="product_cat">
                                                {{ truncate(lesson['description'], 70, {ellipsis:"..."}) }}
                                                <a
                                                    :href="`/category/${lesson['category']['slug']}`"
                                                >
                                                    postado em
                                                    {{lesson['category']['name']}} - {{ moment(lesson['updatedAt']).fromNow() }}
                                                </a>
                                            </li>
                                        </ul>
                                        <ul class="product-facts clearfix justify-content-between">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../../http';
import truncate from 'truncate';
import moment from 'moment';
import ButtonAddCart from './ButtonAddCart';

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

    components: {
        'button-add-cart': ButtonAddCart,
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