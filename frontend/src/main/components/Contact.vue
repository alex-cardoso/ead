<template>
    <div>
        <span v-html="message_validate"></span>
        <div v-if="sending">Aguarde, mensagem está sendo enviada.</div>
        <form @submit.prevent="send">
            <textarea
                type="text"
                class="form-control"
                v-model="message"
                rows="10"
                placeholder="Qual sua dúvida?..."
            ></textarea>
            <button type="submit" class="btn btn-outline-success float-right mt-2">Enviar</button>
        </form>
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