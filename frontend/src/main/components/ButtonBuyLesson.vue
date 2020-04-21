<template>
    <button @click="buy_lesson" ref="button_buy_lesson" :class="{'btn btn-outline-danger':error}">
        <template v-if="message">{{message}}</template>
        <template v-else>
            <slot></slot>
        </template>
    </button>
</template>

<script>
import http from '../../http';
export default {
    props: ['slug'],

    data() {
        return {
            message: '',
            error: false,
        };
    },

    methods: {
        async buy_lesson() {
            try {
                this.error = false;
                const response = await http.put('/lesson/buy', {
                    lesson: this.slug,
                });

                if (response.data['id'] !== undefined) {
                    this.message = 'Compra da aula feita com sucesso !';
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } catch (error) {
                this.error = true;
                if (error.response.data === 'not_logged_in') {
                    this.message = 'Você precisa estar logado';
                }

                if (error.response.data === 'no_credits') {
                    this.message =
                        'Você não tem créditos para adquirir essa aula';
                }

                setTimeout(() => {
                    this.message = '';
                    this.error = false;
                }, 3000);
            }
        },
    },
};
</script>