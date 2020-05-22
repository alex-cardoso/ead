<template>
    <div>
        <div>
            <iframe
                width="100%"
                :height="!show_sidebar_from_sidebar ? 450 : 600"
                :src="`http://www.youtube.com/embed/${lesson.embed}`"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>

            <div
                class="d-flex justify-content-between"
                v-if="lessons_after_and_before !== undefined"
            >
                <a
                    :href="
                        `/lesson/${lessons_after_and_before['before']['slug']}`
                    "
                    v-if="lessons_after_and_before['before'] !== null"
                    class="btn btn-primary btn-sm"
                >
                    <i class="fas fa-arrow-circle-left"></i> Anterior
                </a>

                <span v-else></span>

                <template v-if="message_favorited">
                    <button class="btn btn-warning">
                        <i class="far fa-heart"></i>
                        Você precisa estar logado
                    </button>
                </template>
                <template v-else>
                    <template v-if="is_authenticated">
                        <template v-if="favorited !== undefined && favorited.length">
                            <button
                                class="btn btn-primary btn-sm"
                                @click="remove_favorited(favorited[0]['id'])"
                            >
                                <i class="far fa-heart"></i>
                                Remover dos favoritos
                            </button>
                        </template>
                        <template v-else>
                            <button class="btn btn-primary btn-sm" @click="add_favorited">
                                <i class="far fa-heart"></i>
                                Colocar como favorito
                            </button>
                        </template>
                    </template>
                </template>

                <a
                    :href="
                        `/lesson/${lessons_after_and_before['after']['slug']}`
                    "
                    v-if="lessons_after_and_before['after'] !== null"
                    class="btn btn-primary btn-sm"
                >
                    Próxima
                    <i class="fas fa-arrow-circle-right"></i>
                </a>

                <span v-else></span>
            </div>
        </div>
        <div class="item-preview--excerpt">
            <div class="item-preview--activity">
                <div class="activity-single w-50">
                    <p>
                        <span class="icon-basket"></span> Quantos compraram
                    </p>
                    <p>{{ lesson['lessonBuyedFromUsers'].length }}</p>
                </div>
                <div class="activity-single w-50">
                    <p>
                        <span class="icon-heart"></span> Favoritado
                    </p>
                    <p>{{ favorites.length }}</p>
                </div>
            </div>
        </div>
        <div class="item-info">
            <div class="item-navigation">
                <ul class="nav nav-tabs" role="tablist">
                    <li>
                        <a
                            href="#product-details"
                            class="active"
                            id="tab1"
                            aria-controls="product-details"
                            role="tab"
                            data-toggle="tab"
                            aria-selected="true"
                            @click="tab_active('details')"
                        >
                            <span class="icon icon-docs"></span> Detalhes da aula
                        </a>
                    </li>
                    <li>
                        <a
                            href="#product-comment"
                            id="tab2"
                            aria-controls="product-comment"
                            role="tab"
                            data-toggle="tab"
                            @click="tab_active('forum')"
                        >
                            <span class="icon icon-bubbles"></span> Fórum
                        </a>
                    </li>
                </ul>
            </div>
            <!-- ends: .item-navigation -->
            <div class="tab-content">
                <div
                    class="fade show tab-pane product-tab active"
                    id="product-details"
                    role="tabpanel"
                    aria-labelledby="tab1"
                >
                    <div class="tab-content-wrapper">
                        <template v-if="lesson['lessonBuyed'].length">
                            <h3>Detalhes da aula</h3>
                            <p class="p-bottom-30" v-html="lesson['description']"></p>
                        </template>
                        <template v-else>
                            <div class="tab-content-wrapper">
                                <div class="alert alert-info" role="alert">
                                    <strong>Atenção!</strong> Você precisa ter adquirido essa aula para ver o conteúdo da descrição.
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <!-- ends: .tab-content -->
                <div
                    class="fade tab-pane product-tab"
                    id="product-comment"
                    role="tabpanel"
                    aria-labelledby="tab2"
                >
                    <template v-if="lesson['lessonBuyed'].length">
                        <forum-lesson :lesson_id="lesson['id']" :lesson_slug="lesson['slug']"></forum-lesson>
                    </template>
                    <template v-else>
                        <div class="tab-content-wrapper">
                            <div class="alert alert-info" role="alert">
                                <strong>Atenção!</strong> Você precisa ter adquirido essa aula para ver e interagir no fórum.
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../../http';
import ForumLesson from './ForumLesson';

export default {
    props: ['lesson', 'is_authenticated', 'show_sidebar_from_sidebar'],

    data() {
        return {
            lessons: [],
            favorites: [],
            lesson_before: null,
            lesson_after: null,
            user: null,
            message_favorited: false,
            forum_tab_active: false,
        };
    },

    components: {
        'forum-lesson': ForumLesson,
    },

    mounted() {
        this.lessons_category();
        this.get_favorites();
    },

    computed: {
        lessons_after_and_before() {
            if (this.lessons !== undefined) {
                const index = this.lessons.findIndex(lesson => {
                    return this.lesson.id === lesson.id;
                });

                this.lesson_before = index > 0 ? this.lessons[index - 1] : null;
                this.lesson_after =
                    index < this.lessons.length - 1
                        ? this.lessons[index + 1]
                        : null;

                return {
                    before: this.lesson_before,
                    after: this.lesson_after,
                };
            }
        },

        favorited() {
            let favorited = false;
            if (this.favorites.length) {
                favorited = this.favorites.filter(
                    favorite => favorite.userId === this.user.id
                );
            }

            return favorited;
        },

        see_also() {
            if (this.lessons.length) {
                const index = Math.round(Math.random() * this.lessons.length);
                return this.lessons.slice(index, this.lessons.length);
            }
        },
    },

    methods: {
        async lessons_category() {
            try {
                const response = await http.get('/lessons/category', {
                    params: {
                        category: this.lesson['category']['id'],
                    },
                });
                this.lessons = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        async get_favorites() {
            try {
                const response = await http.get('/favorites/lesson', {
                    params: {
                        lessonId: this.lesson['id'],
                    },
                });

                this.favorites = response.data['favorites'];
                this.user = response.data['user'];
            } catch (error) {
                console.log(error);
            }
        },

        async add_favorited() {
            try {
                const response = await http.post('/favorites', {
                    lessonId: this.lesson['id'],
                });

                if (response.data[0] !== undefined) {
                    this.favorites.push({ ...response.data[0] });
                }
            } catch (error) {
                if (
                    error.response !== undefined &&
                    error.response.data === 'not_logged_in'
                ) {
                    this.message_favorited = true;
                }

                setTimeout(() => {
                    this.message_favorited = false;
                }, 3000);
                console.log(error);
            }
        },

        async remove_favorited(id) {
            const response = await http.delete('/favorites', {
                params: {
                    id,
                },
            });

            if (response.data === 1) {
                this.favorites.find((favorite, index) => {
                    if (favorite.userId === this.user['id']) {
                        this.favorites.splice(index, 1);
                    }
                });
            }
        },

        tab_active(tab) {
            this.forum_tab_active = tab === 'forum' ? true : false;

            this.forum_tab_active
                ? EventBus.$emit('forum_tab_active', true)
                : EventBus.$emit('forum_tab_active', false);
        },
    },
};
</script>