<template>
    <div>
        <div class="credit_modules">
            <div class="modules__title">
                <h4>Adicionar créditos</h4>
            </div>

            <div class="modules__content credit--contents align-items-center">
                <div>
                    <p class="subtitle">Quanto de crédito deseja adicionar?</p>
                    <div class="amounts">
                        <ul>
                            <li data-price="10" @click="add(10)">
                                <p>R$10</p>
                            </li>
                            <li data-price="20" @click="add(20)">
                                <p>R$20</p>
                            </li>
                            <li data-price="50" @click="add(50)">
                                <p>R$50</p>
                            </li>
                            <li data-price="100" @click="add(100)">
                                <p>R$100</p>
                            </li>
                            <li data-price="500" @click="add(500)">
                                <p>R$500</p>
                            </li>
                        </ul>
                        <input type="hidden" class="selected_price" />
                        <div class="or">Ou</div>
                    </div>
                </div>
                <!-- ends: .amounts -->
                <div>
                    <p class="subtitle">Digite um valor</p>
                    <div class="custom_amount">
                        <div class="input-group">
                            <money-mask v-model="price" v-bind="money"></money-mask>
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding-left:30px;">
                <template v-if="message">
                    <div v-html="message"></div>
                </template>
                <template v-else>
                    <button type="submit" class="btn btn--md btn-primary" @click="buy_credits">
                        <template v-if="paying">
                            <b-spinner class="float-left mb-2"></b-spinner>
                        </template>
                        <template v-else>Comprar</template>
                    </button>
                </template>
            </div>
        </div>
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

                if (this.price <= 0) {
                    this.paying = false;
                    this.message = `<span class="alert alert-warning">O valor tem que ser maior que ${this.price}</span>`;
                    setTimeout(() => {
                        this.message = null;
                    }, 3000);
                    return false;
                }

                const response = await http.get('/pagseguro/checkout', {
                    params: {
                        value: this.price,
                    },
                });

                const code = response.data['code'];
                const redirect = response.data['link'];

                this.message =
                    '<span class="alert alert-success">Em 3 segundos você será redirecionado para o pagseguro para finalizar sua compra dos créditos.</span>';

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

        add(price) {
            this.price = price;
        },
    },
};
</script>
