<template>
    <div class="mt-3">
        <p>
            Somente perguntas a respeito da aula serão respondidas, perguntas de outras aulas coloque em suas pespectivas.
            <br />Para adicionar um código, use os
            <a
                href="https://guides.github.com/features/mastering-markdown/"
                target="__blank"
                style="text-decoration:underline;color:blue;"
            >markdowns</a> para formatar corretamente.
        </p>
        <div id="question">
            <form @submit.prevent="send_question">
                <textarea rows="8" class="w-100"></textarea>
                <button type="submit" class="btn btn-outline-success float-right">Enviar</button>
            </form>
            <div class="clearfix"></div>
        </div>
        <div v-if="loaded_forum" class="mt-5">
            <ul class="list-forum-posts">
                <li v-for="post in posts['posts']" :key="post.id">
                    <div class="d-flex justify-content-between">
                        <section class="w-25">
                            <img :src="post['user'].avatar" width="60" height="55" />
                        </section>
                        <section class="w-auto ml-3">
                            <h3>{{ post.title }}</h3>
                            <span>{{post['user']['name']}} {{post['user']['last_name']}} em {{new Date(post['createdAt']) | date}}</span>
                            <p class="pre-formatted" v-html="post.message"></p>
                        </section>
                    </div>
                    <template v-if="post['replies'].length">
                        <ul class="list-forum-posts">
                            <li
                                v-for="reply in post['replies']"
                                :key="reply.id"
                                class="d-flex justify-content-between replies mb-1"
                            >
                                <section class="w-25">
                                    <img :src="reply['user'].avatar" width="60" height="55" />
                                </section>
                                <section class="w-100">
                                    <span>{{reply['user']['name']}} {{reply['user']['last_name']}} em {{new Date(reply['createdAt']) | date}}</span>
                                    <p class="pre-formatted" v-html="reply.reply"></p>
                                </section>
                            </li>
                        </ul>
                    </template>
                </li>
            </ul>
        </div>
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
            posts: [],
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

                    this.posts_forum();
                }
            } catch (error) {
                console.log(error);
            }
        },

        async posts_forum() {
            try {
                const response = await http.get('/forum/posts', {
                    params: {
                        forumId: this.forumId,
                    },
                });

                this.posts = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        send_question() {
            console.log('send');
        },
    },
};
</script>

<style scoped>
.pre-formatted {
    white-space: pre-wrap;
    border: 1px dotted;
    padding: 1rem;
}

#question {
    background-color: aliceblue;
    padding: 15px;
}

.replies {
    background-color: aliceblue;
    padding: 5px;
}
</style>