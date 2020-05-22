<template>
    <div>
        <modal title="Sua senha" class="modal" ref="modal" @close="close_modal">
            <p>Digite sua senha antes de atualizar seus dados</p>

            <template v-slot:content>
                <div v-if="loading_update_profile" class="mb-2">Aguarde, atualizando...</div>
                <div v-if="message_new_password" v-html="message_new_password" style="margin:auto;"></div>

                <h5>Para alterar seus dados você precisa colocar sua senha atual</h5>
                <input
                    type="password"
                    class="form-control"
                    v-model="new_password"
                    placeholder="Sua senha..."
                />
            </template>
            <template v-slot:buttons>
                <button class="btn btn-success btn-sm" @click="save">Salvar alterações</button>
            </template>
        </modal>

        <div class="row">
            <div class="col-lg-12">
                <div class="author-profile">
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                            <div class="author-desc">
                                <div class="infos">
                                    <h4>{{user.name}} {{user.last_name}}</h4>
                                    <span>Cadastrado desde, {{ new Date(user.createdAt) | date }}</span>
                                </div>
                            </div>
                            <hr />
                            <avatar :user="user"></avatar>
                        </div>
                        <div class="col-lg-6 order-lg-2 col-md-6 order-md-1">
                            <div class="author-stats">
                                <article class="card-body">
                                    <div
                                        v-html="message"
                                        style="font-size:14px;margin:auto;"
                                        class="w-100 mb-4"
                                    ></div>
                                    <div v-if="loading">Aguarde, cadastrando seus dados...</div>
                                    <form @submit.prevent="close_modal">
                                        <div class="form-row">
                                            <div class="col form-group">
                                                <label>Nome</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Seu nome"
                                                    v-model="user_data.name"
                                                />
                                                <span
                                                    v-html="errors['user.name']"
                                                    class="error_validation"
                                                ></span>
                                            </div>
                                            <div class="col form-group">
                                                <label>Sobrenome</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Seu sobrenome"
                                                    v-model="user_data.last_name"
                                                />
                                                <span
                                                    v-html="errors['user.last_name']"
                                                    class="error_validation"
                                                ></span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                class="form-control"
                                                placeholder="Seu email"
                                                v-model="user_data.email"
                                            />
                                            <small
                                                class="form-text text-muted"
                                            >Nós nunca compartilharemos seu email com ninguém.</small>
                                            <span
                                                v-html="errors['user.email']"
                                                class="error_validation"
                                            ></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Senha</label>
                                            <input
                                                type="password"
                                                class="form-control"
                                                placeholder="Sua nova senha"
                                                v-model="user_data.password"
                                                autocomplete="new-password"
                                            />
                                            <small
                                                class="form-text text-muted"
                                            >Só digite uma nova senha caso queira alterar a atual.</small>
                                        </div>
                                        <div class="form-group">
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-block"
                                            >Atualizar</button>
                                        </div>
                                    </form>
                                </article>

                                <article class="card-body">
                                    <input
                                        type="checkbox"
                                        v-model="checked_receive_email_reply_forum"
                                        @change="update_receive_email_reply_forum"
                                    />
                                    Caso não queira mais receber emails quando alguém responder a uma pergunta nos fóruns, desabilite o campo ao lado.
                                </article>

                                <template v-if="message_update_reply">
                                    <div v-html="message_update_reply"></div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from '../../helpers/Modal';
import Avatar from './Avatar';
import http from '../../http';

export default {
    props: ['user'],

    data() {
        return {
            errors: {},
            message: null,
            new_password: '',
            message_update_reply: null,
            user_data: this.user,
            loading: false,
            loading_update_profile: false,
            message_new_password: null,
            checked_receive_email_reply_forum:
                this.user.receive_email_reply_forum === 1 ? true : false,
        };
    },

    components: {
        modal: Modal,
        avatar: Avatar,
    },

    methods: {
        close_modal() {
            this.$refs['modal'].$el.classList.toggle('is-active');
        },

        async save() {
            try {
                this.loading_update_profile = true;
                if (this.new_password === '') {
                    this.message_new_password = `<div class="alert alert-danger mb-2 w-100" role="alert">Digite sua senha</div>`;
                    this.loading_update_profile = false;

                    setTimeout(() => {
                        this.message_new_password = null;
                    }, 3000);
                    return false;
                }

                const response = await http.put('/profile/update', {
                    password_to_confirm: this.new_password,
                    user: this.user_data,
                });

                if (response.data === 'updated') {
                    this.$refs['modal'].$el.classList.toggle('is-active');
                    this.message = `<div class="alert alert-success w-100 mb-2" role="alert">Dados atualizados</div>`;
                } else {
                    this.message = `<div class="alert alert-success w-100 mb-2" role="alert">Ocorreu um erro ao atualizar seus dados, tente novamente</div>`;
                }
                this.loading_update_profile = false;

                setTimeout(() => {
                    this.message = null;
                }, 3000);
            } catch (error) {
                if (error.response !== undefined) {
                    if (error.response.data === 'password_not_match') {
                        this.message_new_password = `<span class="alert alert-danger">Senha incorreta</span>`;
                        this.loading_update_profile = false;

                        setTimeout(() => {
                            this.message_new_password = null;
                        }, 3000);
                        return false;
                    }

                    if (error.response.data === 'email_exist') {
                        this.$refs['modal'].$el.classList.toggle('is-active');
                        this.errors = {
                            'user.email': 'Email já está sendo usado',
                        };
                        this.loading_update_profile = false;

                        setTimeout(() => {
                            this.errors = {};
                        }, 3000);
                        return false;
                    }

                    this.errors = error.response.data;
                    this.$refs['modal'].$el.classList.toggle('is-active');
                    this.loading_update_profile = false;

                    setTimeout(() => {
                        this.errors = {};
                    }, 3000);
                }

                setTimeout(() => {
                    this.errors = {};
                }, 3000);
                console.log(error);
            }
        },

        async update_receive_email_reply_forum() {
            try {
                console.log(this.checked_receive_email_reply_forum);
                const response = await http.put(
                    '/profile/update/receive-email-reply',
                    {
                        receive_email_reply_forum: this
                            .checked_receive_email_reply_forum
                            ? 1
                            : 2,
                    }
                );

                if (response.data.includes(1)) {
                    this.message_update_reply = `<div class="alert alert-success w-100 mt-2" role="alert">Atualizado</div>`;
                } else {
                    this.message_update_reply = `<div class="alert alert-danger" role="alert">Ocorreu ume rro, tente novamente.</div>`;
                }

                setTimeout(() => {
                    this.message_update_reply = null;
                }, 3000);

                console.log(response.data);
            } catch (error) {
                this.message_update_reply = `<div class="alert alert-danger" role="alert">Ocorreu ume rro, tente novamente.</div>`;

                setTimeout(() => {
                    this.message_update_reply = null;
                }, 3000);

                console.log(error);
            }
            console.log();
        },
    },
};
</script>
