<template>
  <div>
    <section class="signup_area section--padding">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 offset-lg-3">
            <div v-if="attempts >= 4" class="alert alert-danger w-100 mt-4" role="alert">Atualize a página para tentar
              novamente
            </div>
            <div v-else>
              <form action="#" @submit.prevent="create">
                <div class="cardify signup_form">
                  <div class="login--header">
                    <h3>Cadastre-se abaixo</h3>
                    <p>Por favor digite seus dados no formulário abaixo para criar uma conta.</p>
                  </div>
                  <div class="login--form">
                    <div class="form-group">
                      <label for="urname">
                        Nome
                        <span
                          v-html="errors['name']"
                          class="error_validation"
                        ></span>
                      </label>
                      <input
                        type="text"
                        class="text_field"
                        v-model="user.name"
                        placeholder="Enter your Name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="email_ad">
                        Sobrenome
                        <span
                          v-html="errors['last_name']"
                          class="error_validation"
                        ></span>
                      </label>
                      <input
                        type="text"
                        class="text_field"
                        v-model="user.last_name"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div class="form-group">
                      <label for="user_name">
                        Email
                        <span
                          v-html="errors['email']"
                          class="error_validation"
                        ></span>
                      </label>
                      <input
                        type="email"
                        class="text_field"
                        v-model="user.email"
                        placeholder="Enter your username..."
                      />
                    </div>
                    <div class="form-group">
                      <label for="password">
                        Senha
                        <span
                          v-html="errors['password']"
                          class="error_validation"
                        ></span>
                      </label>
                      <input
                        type="password"
                        class="text_field"
                        v-model="user.password"
                        placeholder="Enter your password..."
                      />
                    </div>
                    <div
                      v-if="loading"
                      class="mb-2 text-center w-100 alert alert-warning" role="alert"
                    >Aguarde, cadastrando seus dados...
                    </div>
                    <template v-if="message">
                      <div v-html="message" style="font-size:14px;" class="mb-2"></div>
                    </template>
                    <template v-else>
                      <button
                        class="btn btn--md register_btn btn-primary"
                        type="submit"
                      >Cadastrar
                      </button>
                    </template>
                    <div class="login_assist">
                      <p>
                        Já tem uma conta?
                        <a href="/login">Login</a>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        message: false,
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

          this.message = (response.data['id'] !== undefined) ?
            '<div class="alert alert-success w-100" role="alert">Verifique sua caixa de entrada</div>' :
            '<div class="alert alert-danger w-100" role="alert">Ocorreu um erro, tente novamente.</div>';

          this.errors = {};
          this.loading = false;

          setTimeout(() => {
            this.message = '';
          }, 10000);
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
