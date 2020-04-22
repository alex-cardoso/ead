<template>
    <div>
        <div>
            <iframe
                width="100%"
                height="450"
                :src="`http://www.youtube.com/embed/${embed}`"
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
                    class="btn btn-outline-success"
                >
                    <i class="fas fa-arrow-circle-left"></i> Anterior
                </a>

                <span v-else></span>

                <template v-if="favorited !== undefined && favorited.length">
                    <button class="btn btn-danger" @click="remove_favorited(favorited[0]['id'])">
                        ({{ favorites.length }})
                        <i class="far fa-heart"></i>
                        Remover dos favoritos
                    </button>
                </template>
                <template v-else>
                    <button class="btn btn-outline-danger" @click="add_favorited">
                        ({{ favorites.length }})
                        <i class="far fa-heart"></i>
                        Colocar como favorito
                    </button>
                </template>

                <a
                    :href="
                        `/lesson/${lessons_after_and_before['after']['slug']}`
                    "
                    v-if="lessons_after_and_before['after'] !== null"
                    class="btn btn-outline-success"
                >
                    Próxima
                    <i class="fas fa-arrow-circle-right"></i>
                </a>

                <span v-else></span>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../../http';

export default {
    props: ['embed', 'category', 'lesson_id'],

    data() {
        return {
            lessons: [],
            favorites: [],
            lesson_before: null,
            lesson_after: null,
            user: null,
        };
    },

    mounted() {
        this.lessons_category();
        this.get_favorites();
    },

    computed: {
        lessons_after_and_before() {
            if (this.lessons['rows'] !== undefined) {
                const index = this.lessons['rows'].findIndex(lesson => {
                    return this.lesson_id === lesson.id;
                });

                this.lesson_before =
                    index > 0 ? this.lessons['rows'][index - 1] : null;
                this.lesson_after =
                    index < this.lessons['rows'].length - 1
                        ? this.lessons['rows'][index + 1]
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
    },

    methods: {
        async lessons_category() {
            try {
                const response = await http.get('/lessons/category', {
                    params: {
                        category: this.category['id'],
                    },
                });
                this.lessons = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        async get_favorites() {
            try {
                const response = await http.get('/favorites', {
                    params: {
                        lessonId: this.lesson_id,
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
                    lessonId: this.lesson_id,
                });

                if (response.data[0] !== undefined) {
                    this.favorites.push({ ...response.data[0] });
                }
            } catch (error) {
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
    },
};
</script>
