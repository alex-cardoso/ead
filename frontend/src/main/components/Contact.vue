<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-title mt-4">
                        <h1>Entre em contato</h1>
                        <p>Digite no campo abaixo sua mensagem, que responderei o mais breve possível.</p>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 mb-4">
                    <form @submit.prevent="send">
                        <textarea
                            type="text"
                            class="form-control w-100"
                            v-model="message"
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
        </div>
    </div>
</template>

<script>
import http from '../../http';

export default {
    data() {
        return {
            message: '',
            message_validate: null,
            sending: false,
        };
    },

    methods: {
        async send() {
            try {
                this.sending = true;

                if (!this.message) {
                    this.message_validate =
                        "<span class='alert alert-danger'>Digite uma mensagem</span>";
                    this.sending = false;
                    setTimeout(() => {
                        this.message_validate = '';
                        this.message = '';
                    }, 3000);
                    return false;
                }

                const response = await http.post('/contact', {
                    message: this.message,
                });

                if (response.data['id'] !== undefined) {
                    this.message_validate =
                        "<span class='alert alert-success'>Mensagem enviada, em breve retornaremos.</span>";
                }

                this.sending = false;

                setTimeout(() => {
                    this.message_validate = '';
                    this.message = '';
                }, 3000);
            } catch (error) {
                this.message_validate =
                    "<span class='alert alert-danger'>Ocorreu um erro ao enviar seu contato.</span>";
                this.sending = false;

                setTimeout(() => {
                    this.message_validate = '';
                    this.message = '';
                }, 3000);
                console.log(error);
            }
        },
    },
};
</script>