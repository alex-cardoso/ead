<template>
    <div>
        <div class="container">
            <div class="row" v-if="attempt < 3">
                <div class="col-md-12">
                    <div class="section-title mt-4">
                        <h1>Entre em contato</h1>
                        <p>Digite no campo abaixo sua mensagem, que responderei o mais breve possível.</p>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 mb-4">
                    <form @submit.prevent="send">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Seu nome..."
                            v-model="message.name"
                        />
                        <input
                            type="email"
                            class="form-control mt-2"
                            placeholder="Seu email..."
                            v-model="message.email"
                        />
                        <textarea
                            type="text"
                            class="form-control w-100 mt-2"
                            v-model="message.message"
                            rows="10"
                            placeholder="Qual sua dúvida?..."
                        ></textarea>
                        <div v-if="sending">Aguarde, mensagem está sendo enviada.</div>
                        <template v-if="message_validate">
                            <span v-html="message_validate" class="mt-4 float-right"></span>
                        </template>
                        <template v-else>
                            <button type="submit" class="btn btn-primary float-right mt-2">Enviar</button>
                        </template>
                    </form>
                </div>
            </div>
            <div v-else>
                <div class="row mt-3">
                    <div class="col-md-12 text-center">
                        <h2
                            class="alert alert-warning w-100"
                            role="alert"
                        >Atualize a página e tente novamente.</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../../http';

export default {
    data() {
        return {
            message: {},
            message_validate: null,
            sending: false,
            attempt: 0,
        };
    },

    methods: {
        async send() {
            try {
                this.sending = true;

                if (Object.keys(this.message).length < 3) {
                    this.message_validate =
                        "<div class='alert alert-danger w-100' role='alert'>Preencha todos os campos.</div>";
                    this.sending = false;
                    setTimeout(() => {
                        this.message_validate = '';
                        this.attempt++;
                    }, 3000);
                    return false;
                }

                const response = await http.post('/contact', {
                    message: this.message.message,
                    name: this.message.name,
                    email: this.message.email,
                });

                if (response.data['id'] !== undefined || response.data === 'sent') {
                    this.message_validate =
                        "<div class='alert alert-success w-100' role='alert'>Mensagem enviada, em breve retornaremos.</div>";
                }

                this.sending = false;

                setTimeout(() => {
                    this.message_validate = '';
                    this.message = {};
                    this.attempt++;
                }, 3000);
            } catch (error) {
                if (error.response !== undefined) {
                    if (error.response.data === 'error_repeated_letters') {
                        this.message_validate =
                            "<div class='alert alert-danger w-100' role='alert'>Muitas letras repetidas em algum campo.</div>";
                    }
                } else {
                    this.message_validate =
                        "<div class='alert alert-danger w-100' role='alert'>Ocorreu um erro ao enviar seu contato.</div>";
                }

                setTimeout(() => {
                    this.message_validate = '';
                    this.sending = false;
                    this.attempt++;
                }, 3000);
            }
        },
    },
};
</script>
