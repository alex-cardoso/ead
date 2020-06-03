<template>
    <div>
        <modal title="Recuperar Senha" class="modal" ref="modal" @close="toggleModal">
            <p>Digite sua senha antes de continuar</p>
            <template v-slot:content>
                <div
                    v-if="message_send_link"
                    v-html="message_send_link"
                    class="mb-4 mt-2 w-100"
                    style="margin:auto;"
                ></div>

                <div v-if="sending_link" class="mb-4 mt-2 w-100" style="margin:auto;">
                    <span class="alert alert-primary" role="primary">Aguarde, enviando link</span>
                </div>

                <div v-if="sent_link" class="mb-4 mt-2 w-100" style="margin:auto;">
                    <span class="alert alert-success" role="primary">Link enviado para seu email.</span>
                </div>

                <h5>Para recuperar sua senha, digite seu email</h5>

                <input
                    type="text"
                    class="form-control"
                    v-model="email_send_link"
                    placeholder="Seu email..."
                />
            </template>
            <template v-slot:buttons>
                <button class="btn btn-success btn-sm" @click="sendLink">Enviar link</button>
            </template>
        </modal>
        <section class="login_area section--padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
                        <form action="#" @submit.prevent="login">
                            <div class="cardify login">
                                <div class="login--header">
                                    <div v-if="message" v-html="message" class="mb-5"></div>
                                    <h3>Bem Vindo</h3>
                                    <p>Você pode logar com seu email e senha</p>
                                </div>

                                <div class="login--form">
                                    <div class="form-group">
                                        <label for="user_name">Username</label>
                                        <input
                                            id="user_name"
                                            type="text"
                                            class="text_field"
                                            v-model="email"
                                            name="email"
                                            placeholder="Seu email"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="pass">Password</label>
                                        <input
                                            id="pass"
                                            type="password"
                                            class="text_field"
                                            v-model="password"
                                            name="password"
                                            autocomplete="new-password"
                                            placeholder="Sua senha.."
                                        />
                                    </div>
                                    <button class="btn btn--md btn-primary" type="submit">Logar</button>
                                    <div class="login_assist">
                                        <p class="recover">
                                            Esqueceu sua
                                            <a href @click.prevent="toggleModal">senha</a>?
                                        </p>
                                        <p class="signup">
                                            Não tem uma
                                            <a href="/signup">conta</a>?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import http from '../../http';
import Modal from '../../helpers/Modal';

export default {
    data() {
        return {
            email: 'alecar2007@gmail.com',
            password: 'alecar2020',
            message: null,
            message_send_link: null,
            email_send_link: null,
            sending_link: false,
            sent_link: false,
        };
    },

    components: {
        modal: Modal,
    },

    methods: {
        async login() {
            try {
                const response = await http.post('/login', {
                    username: this.email,
                    password: this.password,
                });

                if (response.data === 'logged') {
                    window.location.href = '/';
                    return false;
                }
            } catch (error) {
                if (error.response.data === 'Unauthorized') {
                    this.message =
                        '<span class="alert alert-danger" role="alert">Ocorreu um erro,tente novamente.</span>';
                    setTimeout(() => {
                        this.message = null;
                    }, 3000);
                }
            }
        },

        toggleModal() {
            this.$refs['modal'].$el.classList.toggle('is-active');
        },

        async sendLink() {
            try {
                this.sent_link = false;
                this.sending_link = true;
                if (!this.email_send_link) {
                    this.message_send_link = `<span class="alert alert-danger" role="danger">Digite seu email</span>`;
                    this.sending_link = false;

                    setTimeout(() => {
                        this.message_send_link = null;
                    }, 3000);
                    return false;
                }

                await http.post('/reset/password', {
                    email: this.email_send_link,
                });

                this.sending_link = false;
                this.sent_link = true;
            } catch (error) {
                this.sent_link = false;
                this.sending_link = false;
                if (error.response !== undefined) {
                    if (error.response.data === 'email_not_stored') {
                        this.message_send_link = `<span class="alert alert-danger" role="danger">Emai não encontrado.</span>`;

                        setTimeout(() => {
                            this.message_send_link = null;
                        }, 3000);
                    }
                }
                console.log(error);
            }
        },
    },
};
</script>
