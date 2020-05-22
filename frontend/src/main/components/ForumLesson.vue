<template>
    <div class="mt-3">
        <modal-response-post class="modal" ref="modal" :title="title_response" @close="close_modal">
            <template v-slot:content>
                <template v-if="loading_reply">Aguarde, enviando sua resposta...</template>
                <div v-if="message_reply" v-html="message_reply" class="mb-3 w-100"></div>
                <button
                    class="btn btn-info btn-sm mb-2"
                    style="float:right;"
                    @click="add_code_markdown_to_create_post_textarea('add_reply')"
                >
                    <i class="fas fa-code"></i>
                </button>
                <textarea
                    rows="8"
                    class="w-100"
                    ref="add_reply"
                    v-model="response.message"
                    placeholder="Digite sua resposta..."
                ></textarea>
            </template>
            <template v-slot:buttons>
                <button class="btn btn-success btn-sm" @click="send_response">Responder</button>
            </template>
        </modal-response-post>

        <p class="p-3">
            Somente perguntas a respeito da aula serão respondidas, perguntas de
            outras aulas coloque em suas pespectivas.
        </p>
        <p class="p-3">
            Para adicionar um código, use os
            <a
                href="https://guides.github.com/features/mastering-markdown/"
                target="__blank"
                style="text-decoration:underline;color:blue;"
            >markdowns</a>
            para formatar corretamente, ou clique em adicionar código.
            <i
                class="fas fa-code"
            ></i>
        </p>

        <!-- Posts -->
        <div id="question">
            <form @submit.prevent="send_question">
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
                <template v-if="message">
                    <div v-html="message"></div>
                </template>
                <template v-else>
                    <template v-if="loading_thread">
                        <span
                            class="alert alert-info float-right mt-3 mb-2"
                            role="alert"
                        >Aguarde, enviando sua dúvida.</span>
                    </template>
                    <template v-else>
                        <button type="submit" class="btn btn-primary float-right">Enviar</button>
                    </template>
                </template>
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
            <div class="thread">
                <ul class="media-list thread-list">
                    <li class="single-thread" v-for="post in posts['posts']" :key="post.id">
                        <div class="media">
                            <div class="media-left">
                                <a href="#">
                                    <img
                                        class="media-object"
                                        :src="post['user'].avatar"
                                        alt="Avatar"
                                    />
                                </a>
                            </div>
                            <div class="media-body">
                                <div>
                                    <div class="media-heading">
                                        <a href="author.html">
                                            <h4>
                                                {{ post['user']['name'] }}
                                                {{ post['user']['last_name'] }}
                                            </h4>
                                        </a>
                                        <span>{{ new Date(post['createdAt']) | date }}</span>
                                    </div>
                                    <a
                                        href="#"
                                        class="reply-link"
                                        @click="response_post(post)"
                                        v-if="!post_to_edit.includes(post['id'])"
                                    >
                                        <i class="far fa-comments"></i> Responder
                                    </a>
                                    <template v-if="userId === post['user']['id']">
                                        <template v-if="post_to_edit.includes(post['id'])">
                                            <a
                                                href="#"
                                                class="reply-link"
                                                @click.prevent="add_code_markdown_to_create_post_textarea(`post_to_edit${post['id']}`,false)"
                                            >
                                                <i class="fas fa-code"></i>
                                                Add code
                                            </a>
                                            <a
                                                href="#"
                                                class="reply-link"
                                                @click.prevent="edit_post_save(post)"
                                            >
                                                <i class="fas fa-check"></i> Salvar
                                            </a>
                                            <a
                                                href="#"
                                                class="reply-link"
                                                @click.prevent="edit_back_post(post)"
                                            >
                                                <i class="far fa-times-circle"></i> Cancelar
                                            </a>
                                        </template>
                                        <template v-else>
                                            <a
                                                href="#"
                                                class="reply-link"
                                                @click.prevent="edit_post(post['id'])"
                                            >
                                                <i class="fas fa-pencil-alt"></i> Editar
                                            </a>
                                            <a
                                                href="#"
                                                class="reply-link"
                                                @click.prevent="remove_post(post['id'])"
                                            >
                                                <i class="far fa-trash-alt"></i> Excluir
                                            </a>
                                        </template>
                                    </template>
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
                                    <p class="pre-formatted" v-html="marked(post.message.trim())"></p>
                                </template>
                            </div>
                        </div>
                        <!-- nested comment markup / replies -->
                        <ul class="children">
                            <li
                                class="single-thread depth-2"
                                v-for="reply in post['replies']"
                                :key="reply.id"
                            >
                                <div class="media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img
                                                class="media-object"
                                                :src="reply['user'].avatar"
                                                alt="Avatar"
                                            />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <div class="media-heading">
                                            <h4>
                                                {{ reply['user']['name'] }}
                                                {{ reply['user']['last_name'] }}
                                            </h4>
                                            <span>{{ new Date(reply['createdAt']) | date }}</span>
                                        </div>

                                        <template v-if="userId === reply['user']['id']">
                                            <template v-if="reply_to_edit.includes(reply['id'])">
                                                <a
                                                    href="#"
                                                    class="reply-link"
                                                    @click.prevent="
                                                        add_code_markdown_to_create_post_textarea(
                                                            `reply_to_edit${reply['id']}`,
                                                            false
                                                        )
                                                    "
                                                >
                                                    <i class="fas fa-code"></i>
                                                    Add code
                                                </a>
                                                <a
                                                    href="#"
                                                    class="reply-link"
                                                    @click.prevent="edit_reply_save(reply)"
                                                >
                                                    <i class="fas fa-check"></i> Salvar
                                                </a>
                                                <a
                                                    href="#"
                                                    class="reply-link"
                                                    @click.prevent="edit_back_reply(reply)"
                                                >
                                                    <i class="far fa-times-circle"></i> Cancelar
                                                </a>
                                            </template>
                                            <template v-else>
                                                <a
                                                    href="#"
                                                    class="reply-link"
                                                    @click.prevent="edit_reply(reply['id'])"
                                                >
                                                    <i class="fas fa-pencil-alt"></i> Editar
                                                </a>
                                                <a
                                                    href="#"
                                                    class="reply-link"
                                                    @click.prevent="remove_reply(post,reply)"
                                                >
                                                    <i class="far fa-trash-alt"></i> Excluir
                                                </a>
                                            </template>
                                        </template>

                                        <template v-if="reply_to_edit.includes(reply['id'])">
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
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
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
import { strip_tags_except_markdown } from '../../helpers';

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
            in_bottom: false,
            lastPosts: false,
            message: null,
            message_post: [],
            posts: [],
            post: null,
            post_to_edit: [],
            reply_to_edit: [],
            reply: null,
            loading_thread: false,
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
                this.loading_thread = true;
                if (!this.post) {
                    this.message =
                        '<div class="alert alert-danger mt-3 mb-2 float-right w-100" role="alert">Digite uma dúvida !</div>';

                    setTimeout(() => {
                        this.message = null;
                        this.loading_thread = false;
                    }, 3000);
                    return false;
                }

                const response = await http.post('/forum/post', {
                    token: this.$refs.recaptcha.value,
                    post: strip_tags_except_markdown(this.post),
                    forumId: this.forumId,
                    lessonId: this.lesson_id,
                    lessonSlug: this.lesson_slug,
                });

                if (response.data['id'] !== undefined) {
                    this.message =
                        '<div class="alert alert-success mt-3 mb-2 float-right w-100" role="alert">Dúvida enviada com sucesso !</div>';
                    this.post = null;
                }
                this.loading_thread = false;

                setTimeout(() => {
                    this.message = null;
                }, 5000);
            } catch (error) {
                this.loading_thread = false;
                if (error.response.data === 'error_recaptcha') {
                    this.message =
                        '<div class="alert alert-danger mt-3 mb-2 float-right w-100" role="alert">Ocorreu um erro ao enviar seu dúvida, atualize a página e tente novamente</div>';
                }

                if (error.response.data === 'not_logged_in') {
                    this.message =
                        '<div class="alert alert-danger mt-3 mb-2 float-right w-100" role="alert">Você precisa estar logado.</div>';
                }

                setTimeout(() => {
                    this.message = null;
                }, 5000);
            }
        },

        async showMore(show_more) {
            if (!this.lastPosts && this.posts['posts'] !== undefined && show_more) {
                let lastPost = this.posts['posts'][this.posts['posts'].length - 1];
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
                const message = strip_tags_except_markdown(this.$refs[ref_post][0]['value'].trim());

                if (!message || message === '') {
                    this.message_post = [];
                    this.message_post[
                        post['id']
                    ] = `<div class="alert alert-danger w-100" role="alert">Digite sua mensagem</div>`;
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
                    ] = `<div class="alert alert-success w-100" role="alert">Atualizado</div>`;
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

                const message = strip_tags_except_markdown(this.$refs[ref_reply][0]['value'].trim());

                if (!message || message === '') {
                    this.message_reply_update = [];
                    this.message_reply_update[
                        reply['id']
                    ] = `<div class="alert alert-danger w-100" role="alert">Digite sua mensagem</div>`;
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
                    ] = `<div class="alert alert-success w-100" role="alert">Atualizado</div>`;
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
                if (this.response.message === undefined || this.response.message === '') {
                    this.message_reply =
                        '<div class="alert alert-danger w-100" role="alert">Preciso de uma resposta.</div>';
                    setTimeout(() => {
                        this.message_reply = null;
                    }, 2000);
                    return false;
                }

                this.loading_reply = true;
                this.response.message = strip_tags_except_markdown(this.response.message);
                const response = await http.post('/forum/reply', this.response);
                if (response.data['id'] !== undefined) {
                    this.message_reply =
                        '<div class="alert alert-success w-100" role="alert">Respondido com sucesso</div>';
                } else {
                    this.message_reply =
                        '<div class="alert alert-danger w-100" role="alert">Ocorreu um erro ao responder esse post</div>';
                }
                this.loading_reply = false;
                setTimeout(() => {
                    this.message_reply = null;
                    this.response = {};
                }, 2000);
            } catch (error) {
                console.log(error);
                this.loading_reply = false;
                this.message_reply =
                    '<div class="alert alert-danger w-100" role="alert">Ocorreu um erro ao responder esse post.</div>';
                setTimeout(() => {
                    this.message_reply = null;
                    this.response = {};
                }, 2000);
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
.reply-link {
    margin-right: 5px !important;
    font-size: 13px !important;
}

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

.thread .thread-list .single-thread .media-body p {
    padding-top: 0 !important;
}
</style>
