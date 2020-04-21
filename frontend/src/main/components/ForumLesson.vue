<template>
    <div class="mt-3">
        <!-- Modal -->
        <modal-response-post class="modal" ref="modal" :title="title_response" @close="close_modal">
            <template v-slot:content>
                <template v-if="loading_reply">Aguarde, salvando sua resposta...</template>
                <div v-if="message_reply" v-html="message_reply" class="mb-3 w-100"></div>
                <textarea
                    rows="8"
                    class="w-100"
                    v-model="response.message"
                    placeholder="Digite sua resposta..."
                ></textarea>
            </template>
            <template v-slot:buttons>
                <button class="btn btn-outline-success btn-sm" @click="send_response">Salvar</button>
            </template>
        </modal-response-post>
        <!-- Posts -->
        <p>
            Somente perguntas a respeito da aula serão respondidas, perguntas de
            outras aulas coloque em suas pespectivas.
            <br />Para adicionar um código, use os
            <a
                href="https://guides.github.com/features/mastering-markdown/"
                target="__blank"
                style="text-decoration:underline;color:blue;"
            >markdowns</a>
            para formatar corretamente, ou clique em adicionar código.
        </p>

        <div id="question">
            <form @submit.prevent="send_question">
                <div v-if="message" v-html="message" class="mb-3"></div>
                <button
                    @click.prevent="
                        add_code_markdown_to_create_post_textarea(
                            'create_post_textarea'
                        )
                    "
                    class="btn btn-outline-info float-right mb-2"
                >
                    <i class="fas fa-code"></i>
                </button>
                <textarea
                    rows="8"
                    class="w-100"
                    ref="create_post_textarea"
                    v-model="post"
                    placeholder="Digite sua pergunta..."
                ></textarea>
                <button type="submit" class="btn btn-outline-success float-right">Enviar</button>
                <input
                    type="hidden"
                    ref="recaptcha"
                    name="recaptcha_response"
                    id="g-recaptcha-response"
                />
            </form>
            <div class="clearfix"></div>
        </div>
        <div v-if="loaded_forum" class="mt-5">
            <ul class="list-forum-posts">
                <li v-for="post in posts['posts']" :key="post.id" class="mb-3">
                    <div class="d-flex justify-content-between mb-3">
                        <section class="w-auto">
                            <img :src="post['user'].avatar" width="84" height="80" class="mb-2" />
                            <button
                                class="btn btn-outline-info btn-sm"
                                @click="response_post(post)"
                            >Responder</button>
                        </section>
                        <section class="w-100 ml-3">
                            <div
                                v-if="message_post[post['id']]"
                                v-html="message_post[post['id']]"
                                class="mb-3"
                            ></div>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span>
                                    Postado por
                                    <b>
                                        {{ post['user']['name'] }}
                                        {{ post['user']['last_name'] }}
                                    </b>
                                    em
                                    <b>
                                        {{
                                        new Date(post['createdAt']) | date
                                        }}
                                    </b>
                                </span>
                                <div v-if="userId === post['user']['id']">
                                    <template v-if="post_to_edit.includes(post['id'])">
                                        <button
                                            class="btn btn-outline-success btn-sm"
                                            @click="edit_post_save(post)"
                                        >Salvar</button>
                                        <button
                                            class="btn btn-outline-info btn-sm"
                                            @click="
                                                add_code_markdown_to_create_post_textarea(
                                                    `post_to_edit${post['id']}`,
                                                    false
                                                )
                                            "
                                        >
                                            <i class="fas fa-code"></i>
                                        </button>
                                        <button
                                            class="btn btn-outline-danger btn-sm"
                                            @click="edit_back_post(post)"
                                        >Cancelar</button>
                                    </template>
                                    <template v-else>
                                        <button
                                            class="btn btn-outline-success btn-sm"
                                            @click="edit_post(post['id'])"
                                        >Editar</button>
                                        <button
                                            class="btn btn-outline-danger btn-sm"
                                            @click="remove_post(post['id'])"
                                        >Excluir</button>
                                    </template>
                                </div>
                            </div>
                            <template v-if="post_to_edit.includes(post['id'])">
                                <textarea
                                    rows="8"
                                    class="w-100"
                                    :ref="`post_to_edit${post['id']}`"
                                    :value="post.message.trim()"
                                ></textarea>
                            </template>
                            <template v-else>
                                <div class="pre-formatted" v-html="marked(post.message.trim())"></div>
                            </template>
                        </section>
                    </div>
                    <template v-if="post['replies'].length">
                        <ul class="list-forum-posts">
                            <li
                                v-for="reply in post['replies']"
                                :key="reply.id"
                                class="d-flex justify-content-between replies mb-3"
                            >
                                <section class="w-auto">
                                    <img
                                        :src="reply['user'].avatar"
                                        width="84"
                                        height="75"
                                        class="mb-2"
                                    />
                                    <button
                                        class="btn btn-outline-info btn-sm"
                                        @click="response_post(post)"
                                    >Responder</button>
                                </section>
                                <section class="w-100">
                                    <div
                                        v-if="message_reply_update[reply['id']]"
                                        v-html="
                                            message_reply_update[reply['id']]
                                        "
                                        class="mb-3"
                                    ></div>
                                    <div
                                        class="d-flex justify-content-between align-items-center mb-2"
                                    >
                                        <span>
                                            Respondido por
                                            <b>
                                                {{ reply['user']['name'] }}
                                                {{ reply['user']['last_name'] }}
                                            </b>
                                            em
                                            <b>
                                                {{
                                                new Date(
                                                reply['createdAt']
                                                ) | date
                                                }}
                                            </b>
                                        </span>

                                        <div
                                            v-if="
                                                userId === reply['user']['id']
                                            "
                                        >
                                            <template
                                                v-if="
                                                    reply_to_edit.includes(
                                                        reply['id']
                                                    )
                                                "
                                            >
                                                <button
                                                    class="btn btn-outline-success btn-sm"
                                                    @click="
                                                        edit_reply_save(reply)
                                                    "
                                                >Salvar</button>
                                                <button
                                                    class="btn btn-outline-info btn-sm"
                                                    @click="
                                                        add_code_markdown_to_create_post_textarea(
                                                            `reply_to_edit${reply['id']}`,
                                                            false
                                                        )
                                                    "
                                                >
                                                    <i class="fas fa-code"></i>
                                                </button>
                                                <button
                                                    class="btn btn-outline-danger btn-sm"
                                                    @click="
                                                        edit_back_reply(reply)
                                                    "
                                                >Cancelar</button>
                                            </template>
                                            <template v-else>
                                                <button
                                                    class="btn btn-outline-success btn-sm"
                                                    @click="
                                                        edit_reply(reply['id'])
                                                    "
                                                >Editar</button>
                                                <button
                                                    class="btn btn-outline-danger btn-sm"
                                                    @click="
                                                        remove_reply(
                                                            post,
                                                            reply
                                                        )
                                                    "
                                                >Excluir</button>
                                            </template>
                                        </div>
                                    </div>

                                    <template
                                        v-if="
                                            reply_to_edit.includes(reply['id'])
                                        "
                                    >
                                        <textarea
                                            rows="8"
                                            class="w-100"
                                            :ref="`reply_to_edit${reply['id']}`"
                                            :value="reply.reply.trim()"
                                        ></textarea>
                                    </template>
                                    <template v-else>
                                        <p class="pre-formatted" v-html="marked(reply.reply)"></p>
                                    </template>
                                </section>
                            </li>
                        </ul>
                    </template>
                    <hr />
                </li>
            </ul>
        </div>
        <scroll-bottom @inBottom="showMore"></scroll-bottom>
    </div>
</template>

<script>
import http from '../../http';
import ScrollBottom from './ScrollBottom';
import Modal from '../../helpers/Modal';
import recaptcha from '../mixins/recaptcha';
import marked from 'marked';
import insertTextAtCursor from 'insert-text-at-cursor';

export default {
    props: ['lesson_id', 'lesson_slug'],

    components: {
        'scroll-bottom': ScrollBottom,
        'modal-response-post': Modal,
    },

    mixins: [recaptcha],

    data() {
        return {
            forumId: null,
            userId: null,
            loaded_forum: false,
            posts: [],
            in_bottom: false,
            lastPosts: false,
            message: null,
            message_post: [],
            post: null,
            post_to_edit: [],
            reply_to_edit: [],
            reply: null,
            loading_reply: false,
            message_reply: null,
            message_reply_update: [],
            title_response: '',
            response: {},
            marked,
        };
    },

    mounted() {
        this.forum();
        this.recaptcha();

        setTimeout(() => {
            hljs.initHighlightingOnLoad();
        }, 500);
    },

    methods: {
        async forum() {
            try {
                const response = await http.get('/forum', {
                    params: {
                        lesson: this.lesson_id,
                    },
                });

                if (response.data['forum'][0] !== undefined) {
                    this.forumId = response.data['forum'][0]['id'];
                    this.loaded_forum = true;

                    this.userId = response.data['loggedIn'];

                    await this.posts_forum();
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

        async send_question() {
            try {
                if (!this.post) {
                    this.message =
                        '<span class="alert alert-danger p-2">Digite uma dúvida !</span>';
                    return false;
                }

                const response = await http.post('/forum/post', {
                    token: this.$refs.recaptcha.value,
                    post: this.post,
                    forumId: this.forumId,
                    lessonId: this.lesson_id,
                });

                if (response.data['id'] !== undefined) {
                    this.message =
                        '<span class="alert alert-success p-2">Dúvida enviada com sucesso !</span>';
                    this.post = null;
                }

                setTimeout(() => {
                    this.message = null;
                }, 5000);
            } catch (error) {
                if (error.response.data === 'error_recaptcha') {
                    this.message =
                        '<span class="alert alert-danger p-2">Ocorreu um erro ao enviar seu dúvida, atualize a página e tente novamente</span>';
                }

                setTimeout(() => {
                    this.message = null;
                }, 5000);
            }
        },

        async showMore(show_more) {
            if (
                !this.lastPosts &&
                this.posts['posts'] !== undefined &&
                show_more
            ) {
                let lastPost = this.posts['posts'][
                    this.posts['posts'].length - 1
                ];
                if (lastPost) {
                    const response = await http.get('/forum/posts/more', {
                        params: {
                            lastPostId: lastPost['id'],
                            forumId: this.forumId,
                        },
                    });

                    if (response.data.length > 0) {
                        this.posts['posts'].push(...response.data);
                        setTimeout(() => {
                            this.restart_highlight();
                        }, 1000);
                    } else {
                        this.lastPosts = true;
                    }
                }
            }
        },

        edit_post(post) {
            try {
                this.post_to_edit = [];
                this.post_to_edit.push(post);
            } catch (error) {
                console.log(error);
            }
        },

        edit_back_post(post) {
            try {
                this.post_to_edit = [];
                setTimeout(() => {
                    this.restart_highlight();
                }, 200);
            } catch (error) {
                console.log(error);
            }
        },

        edit_back_reply(reply) {
            try {
                this.reply_to_edit = [];
                setTimeout(() => {
                    this.restart_highlight();
                }, 200);
            } catch (error) {
                console.log(error);
            }
        },

        async edit_post_save(post) {
            try {
                const ref_post = `post_to_edit${post['id']}`;
                const message = this.$refs[ref_post][0]['value'].trim();

                if (!message || message === '') {
                    this.message_post = [];
                    this.message_post[
                        post['id']
                    ] = `<span class="alert alert-danger">Digite sua mensagem</span>`;
                    setTimeout(() => {
                        this.message_post = [];
                    }, 2000);
                    return false;
                }

                const response = await http.put('/forum/post/update', {
                    data: {
                        id: post['id'],
                        message,
                    },
                });

                if (response.data[0] !== undefined) {
                    post['message'] = message;
                    this.post_to_edit = [];
                    this.message_post[
                        post['id']
                    ] = `<span class="alert alert-success">Atualizado</span>`;
                    setTimeout(() => {
                        this.message_post = [];
                        this.restart_highlight();
                    }, 500);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async edit_reply_save(reply) {
            try {
                const ref_reply = `reply_to_edit${reply['id']}`;
                const message = this.$refs[ref_reply][0]['value'].trim();

                if (!message || message === '') {
                    this.message_reply_update = [];
                    this.message_reply_update[
                        reply['id']
                    ] = `<span class="alert alert-danger">Digite sua mensagem</span>`;
                    setTimeout(() => {
                        this.message_reply_update = [];
                    }, 2000);
                    return false;
                }

                const response = await http.put('/forum/reply/update', {
                    data: {
                        id: reply['id'],
                        reply: message,
                    },
                });

                if (response.data[0] !== undefined) {
                    reply['reply'] = message;
                    this.reply_to_edit = [];
                    this.message_reply_update[
                        reply['id']
                    ] = `<span class="alert alert-success">Atualizado</span>`;
                    setTimeout(() => {
                        this.message_reply_update = [];
                        this.restart_highlight();
                    }, 500);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async remove_post(post) {
            try {
                const response = await http.delete('/forum/post/destroy', {
                    params: {
                        id: post,
                    },
                });

                if (response.data === 1) {
                    const index = this.posts['posts'].findIndex(post_list => {
                        return post_list['id'] === post;
                    });

                    this.posts['posts'].splice(index, 1);
                    return false;
                }
            } catch (error) {
                console.log(error);
            }
        },

        async remove_reply(post, reply) {
            try {
                const response = await http.delete('/forum/reply/destroy', {
                    params: {
                        id: reply['id'],
                    },
                });

                if (response.data === 1) {
                    const index = post['replies'].findIndex(post_reply => {
                        return post_reply['id'] === reply['id'];
                    });

                    post['replies'].splice(index, 1);
                }
            } catch (error) {
                console.log(error);
            }
        },

        edit_reply(reply) {
            try {
                this.reply_to_edit = [];
                this.reply_to_edit.push(reply);
            } catch (error) {
                console.log(error);
            }
        },

        restart_highlight() {
            hljs.initHighlighting.called = false;
            hljs.initHighlighting();
        },

        response_post(post) {
            this.response.postUser = post['user'];
            this.response.forumPostId = post['id'];
            this.response.lesson = {
                id: this.lesson_id,
                slug: this.lesson_slug,
            };
            this.$refs['modal'].$el.classList.toggle('is-active');
            this.title_response = `Responder dúvida de ${post['user']['name']} ${post['user']['last_name']}`;
        },

        async send_response() {
            try {
                this.loading_reply = true;
                const response = await http.post('/forum/reply', this.response);
                if (response.data['id'] !== undefined) {
                    this.message_reply =
                        '<span class="alert alert-success">Respondido com sucesso</span>';
                } else {
                    this.message_reply =
                        '<span class="alert alert-success">Ocorreu um erro ao responder esse post, atualize a página e tente novamente</span>';
                }

                this.loading_reply = false;
                setTimeout(() => {
                    this.message_reply = null;
                    this.response = {};
                }, 2000);
            } catch (error) {
                console.log(error);
                this.message_reply =
                    '<span class="alert alert-success">Ocorreu um erro ao responder esse post, atualize a página e tente novamente</span>';
            }
        },

        close_modal() {
            this.$refs['modal'].$el.classList.toggle('is-active');
        },

        add_code_markdown_to_create_post_textarea(ref, is_unique = true) {
            let el = is_unique ? this.$refs[ref] : this.$refs[ref][0];
            insertTextAtCursor(
                el,
                `
\`\`\`
código aqui
\`\`\`
`
            );
        },
    },
};
</script>

<style scoped>
.pre-formatted {
    border: 1px dotted;
    padding: 0.5rem;
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
