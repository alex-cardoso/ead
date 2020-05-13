<template>
    <section class="login_area section--padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
                    <form action="#" @submit.prevent="updatePassword">
                        <div class="cardify login">
                            <div class="login--header" v-if="!updated">
                                <h3>Alterar a Senha</h3>
                                <p>Digite abaixo sua nova senha</p>

                                <div
                                    v-if="message"
                                    v-html="message"
                                    class="mb-4 mt-3 w-100"
                                    style="margin:auto;"
                                ></div>
                            </div>
                            <!-- end .login_header -->
                            <div class="login--form" v-if="!updated">
                                <div class="form-group">
                                    <label for="user_name">Senha</label>
                                    <input
                                        type="password"
                                        class="text_field"
                                        v-model="password"
                                        placeholder="Sua nova senha..."
                                    />
                                </div>
                                <button class="btn btn--md btn-primary" type="submit">Alterar</button>
                            </div>
                            <div v-else class="text-center mt-3">
                                <p>Você já pode logar com sua nova senha.</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import http from '../../http';

export default {
    props: ['user'],

    data() {
        return {
            password: '',
            message: null,
            updated: false,
        };
    },

    methods: {
        async updatePassword() {
            try {
                if (this.password === '') {
                    this.message =
                        '<span class="alert alert-danger" role="danger">Digite uma senha</span>';
                    setTimeout(() => {
                        this.message = null;
                    }, 3000);
                    return false;
                }

                const response = await http.put('/reset/password', {
                    password: this.password,
                    user: this.user,
                });

                if (response.data.includes(1)) {
                    this.message =
                        '<span class="alert alert-success" role="success">Senha atualizada com sucesso.</span>';
                    setTimeout(() => {
                        this.message = null;
                        this.updated = true;
                    }, 3000);

                    return false;
                }

                this.message =
                    '<span class="alert alert-danger" role="danger">Ocorreu um erro, tente novamente.</span>';
                setTimeout(() => {
                    this.message = null;
                }, 3000);
            } catch (error) {
                this.message =
                    '<span class="alert alert-danger" role="danger">Ocorreu um erro, tente novamente.</span>';
                setTimeout(() => {
                    this.message = null;
                }, 3000);
                console.log(error);
            }
        },
    },
};
</script>