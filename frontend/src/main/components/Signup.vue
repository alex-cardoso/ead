<template>
    <div>
        <div v-if="attempts >= 4">Atualize a página para tentar novamente</div>
        <div class="row justify-content-center" v-else>
            <div class="col-md-6">
                <div class="card">
                    <header class="card-header d-flex justify-content-between">
                        <h4 class="card-title mt-2">Sign up</h4>
                        <a href="/login" class="float-right btn btn-outline-primary mt-1">Log in</a>
                    </header>
                    <article class="card-body">
                        <div v-html="message" style="font-size:14px;"></div>
                        <div v-if="loading">Aguarde, cadastrando seus dados...</div>
                        <form @submit.prevent="create">
                            <div class="form-row">
                                <div class="col form-group">
                                    <label>Nome</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Seu nome"
                                        v-model="user.name"
                                    />
                                    <span v-html="errors['name']" class="error_validation"></span>
                                </div>
                                <!-- form-group end.// -->
                                <div class="col form-group">
                                    <label>Sobrenome</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Seu sobrenome"
                                        v-model="user.last_name"
                                    />
                                    <span v-html="errors['last_name']" class="error_validation"></span>
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
                                    v-model="user.email"
                                />
                                <small
                                    class="form-text text-muted"
                                >Nós nunca compartilharemos seu email com ninguém.</small>
                                <span v-html="errors['email']" class="error_validation"></span>
                            </div>
                            <!-- form-group end.// -->
                            <!-- form-row.// -->
                            <div class="form-group">
                                <label>Senha</label>
                                <input
                                    class="form-control"
                                    type="password"
                                    placeholder="Senha"
                                    v-model="user.password"
                                />
                                <span v-html="errors['password']" class="error_validation"></span>
                            </div>
                            <!-- form-group end.// -->
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">Cadastrar</button>
                            </div>
                            <!-- form-group// -->
                        </form>
                    </article>
                    <!-- card-body end .// -->
                    <div class="border-top card-body text-center">
                        Já tem uma conta?
                        <a href="/login">Log In</a>
                    </div>
                </div>
                <!-- card.// -->
            </div>
            <!-- col.//-->
        </div>
    </div>
</template>

<script>
import http from '../../http';
export default {
    data() {
        return {
            user: {
                name: null,
                las_name: null,
                email: null,
                password: null,
            },
            errors: {},
            message: null,
            loading: false,
            attempts: 0,
        };
    },
    methods: {
        async create() {
            try {
                this.loading = true;

                this.attempts++;

                const response = await http.post('/signup', this.user);

                if (response.data['id'] !== undefined) {
                    this.message =
                        '<span class="alert alert-success">Ative sua conta clicando no link que enviamos para seu email.</span>';
                } else {
                    this.message =
                        '<span class="alert alert-danger">Ocorreu um erro, tente novamente em alguns segundos</span>';
                }

                this.errors = {};
                this.loading = false;

                setTimeout(() => {
                    this.message = '';
                }, 3000);
            } catch (error) {
                this.errors = {};

                this.loading = false;

                if (error.response !== undefined) {
                    this.errors = error.response.data;
                }
            }
        },
    },
};
</script>