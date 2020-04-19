<!-- 'Put a comment' -->
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
                    >Anterior</a
                >

                <span v-else></span>

                <a
                    :href="
                        `/lesson/${lessons_after_and_before['after']['slug']}`
                    "
                    v-if="lessons_after_and_before['after'] !== null"
                    class="btn btn-outline-success"
                    >Próxima</a
                >

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
            lesson_before: null,
            lesson_after: null,
        };
    },

    mounted() {
        this.lessons_category();
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
    },
};
</script>
