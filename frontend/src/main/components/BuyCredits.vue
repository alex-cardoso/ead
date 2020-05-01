<template>
    <div>
        <h2>Comprar créditos</h2>
        <p v-if="paying">Aguarde...</p>
        <p>
            Ao clicar em comprar créditos, você será redirecionado ao pagseguro,
            onde poderá finalizar a compra dos créditos com segurança.
        </p>
        <p class="text-primary">* Verifique se seu navegador estão com os popups ativados.</p>
        <div v-html="message"></div>
        <money-mask v-model="price" v-bind="money"></money-mask>
        <button @click="buy_credits" class="btn btn-outline-success btn-sm">Comprar</button>
    </div>
</template>

<script>
import money from '../mixins/money';
import http from '../../http';

export default {
    mixins: [money],
    data() {
        return {
            message: null,
            paying: false,
        };
    },
    methods: {
        async buy_credits() {
            try {
                this.message = null;
                this.paying = true;
                const response = await http.get('/pagseguro/checkout', {
                    params: {
                        value: this.price,
                    },
                });

                const code = response.data['code'];
                const redirect = response.data['link'];

                this.message =
                    '<span class="alert alert-success">Em 3 segundos você será redirecionado para o pagseguro para finalizar sua compra.</span>';

                setTimeout(() => {
                    window.open(redirect + code, '_blank');
                    this.message = null;
                    this.paying = false;
                }, 3000);
            } catch (error) {
                if (
                    error.response !== undefined &&
                    error.response.data === 'not_logged'
                ) {
                    this.message =
                        '<span class="alert alert-danger">Você precisa estar logado.</span>';
                } else {
                    this.message =
                        '<span class="alert alert-danger">Ocorreu um erro ao realizar o checkout, tente novamente em alguns segundos</span>';
                }

                setTimeout(() => {
                    this.message = null;
                    this.paying = false;
                }, 3000);
            }
        },
    },
};
</script>
