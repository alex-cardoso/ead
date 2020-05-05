<template>
    <div>
        <modal title="Sua senha" class="modal" ref="modal" @close="close_modal">
            <p>Digite sua senha antes de atualizar seus dados</p>
            <template v-slot:content>
                <div v-if="message_new_password" v-html="message_new_password" class="mb-3"></div>

                <h5>Para alterar seus dados você precisa colocar sua senha.</h5>
                <input
                    type="password"
                    class="form-control"
                    v-model="new_password"
                    placeholder="Sua senha..."
                />
            </template>
            <template v-slot:buttons>
                <button class="btn btn-outline-success btn-sm" @click="save">Salvar alterações</button>
            </template>
        </modal>

        <div class="d-flex justify-content-between">
            <div class="w-25">
                <avatar :user="user"></avatar>
            </div>
            <div class="row w-75">
                <div class="col-md-12">
                    <div class="card">
                        <header class="card-header d-flex justify-content-between">
                            <h4 class="card-title mt-2">Profile</h4>
                            <a href="/login" class="float-right btn btn-outline-primary mt-1">Log in</a>
                        </header>
                        <article class="card-body">
                            <div v-html="message" style="font-size:14px;"></div>
                            <div v-if="loading">Aguarde, cadastrando seus dados...</div>
                            <form @submit.prevent="update">
                                <div class="form-row">
                                    <div class="col form-group">
                                        <label>Nome</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Seu nome"
                                            v-model="user_data.name"
                                        />
                                        <span v-html="errors['user.name']" class="error_validation"></span>
                                    </div>
                                    <!-- form-group end.// -->
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
                                    <!-- form-group end.// -->
                                </div>
                                <!-- form-row end.// -->
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
                                    <span v-html="errors['user.email']" class="error_validation"></span>
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
                                <!-- form-group end.// -->
                                <div class="form-group">
                                    <button
                                        type="submit"
                                        class="btn btn-primary btn-block"
                                    >Atualizar</button>
                                </div>
                                <!-- form-group// -->
                            </form>
                        </article>
                    </div>
                    <!-- card.// -->
                </div>
                <!-- col.//-->
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
            user_data: this.user,
            loading: false,
            message_new_password: null,
        };
    },

    components: {
        modal: Modal,
        avatar: Avatar,
    },

    methods: {
        update() {
            this.$refs['modal'].$el.classList.toggle('is-active');
        },

        close_modal() {
            this.$refs['modal'].$el.classList.toggle('is-active');
        },

        async save() {
            try {
                if (this.new_password === '') {
                    this.message_new_password = `<span class="alert alert-danger">Digite sua senha</span>`;

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
                    this.message = `<span class="alert alert-success">Dados atualizados</span>`;
                } else {
                    this.message = `<span class="alert alert-success">Ocorreu um erro ao atualizar seus dados, tente novamente</span>`;
                }

                setTimeout(() => {
                    this.message = null;
                }, 3000);
            } catch (error) {
                console.log('error', error);
                if (error.response !== undefined) {
                    if (error.response.data === 'password_not_match') {
                        this.message_new_password = `<span class="alert alert-danger">Senha não bate com a sua senha</span>`;
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

                        setTimeout(() => {
                            this.errors = {};
                        }, 3000);
                        return false;
                    }

                    this.errors = error.response.data;
                    this.$refs['modal'].$el.classList.toggle('is-active');

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
    },
};
</script>
