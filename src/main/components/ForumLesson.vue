<template>
    <div v-if="loaded_forum">
        <h2>Perguntas do fórum da aula</h2>
    </div>
</template>

<script>
import http from '../../http';

export default {
    props: ['lesson_id'],

    data() {
        return {
            forumId: null,
            loaded_forum: false,
        };
    },

    mounted() {
        this.forum();
    },

    methods: {
        async forum() {
            try {
                const response = await http.get('/forum', {
                    params: {
                        lesson: this.lesson_id,
                    },
                });

                if (response.data[0] !== undefined) {
                    this.forumId = response.data[0]['id'];
                    this.loaded_forum = true;
                }
            } catch (error) {
                console.log(error);
            }
        },

        posts_forum() {},
    },
};
</script>
