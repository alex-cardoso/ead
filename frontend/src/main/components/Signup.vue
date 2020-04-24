<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <header class="card-header d-flex justify-content-between">
                        <h4 class="card-title mt-2">Sign up</h4>
                        <a href="/login" class="float-right btn btn-outline-primary mt-1">Log in</a>
                    </header>
                    <article class="card-body">
                        <form @submit.prevent="create">
                            <div class="form-row">
                                <div class="col form-group">
                                    <label>Nome</label>
                                    <input type="text" class="form-control" placeholder="Seu nome" />
                                </div>
                                <!-- form-group end.// -->
                                <div class="col form-group">
                                    <label>Sobrenome</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Seu sobrenome"
                                    />
                                </div>
                                <!-- form-group end.// -->
                            </div>
                            <!-- form-row end.// -->
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" placeholder="Seu email" />
                                <small
                                    class="form-text text-muted"
                                >Nós nunca compartilharemos seu email com ninguém.</small>
                            </div>
                            <!-- form-group end.// -->
                            <!-- form-row.// -->
                            <div class="form-group">
                                <label>Senha</label>
                                <input class="form-control" type="password" placeholder="Senha" />
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
    methods: {
        async create() {
            try {
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>