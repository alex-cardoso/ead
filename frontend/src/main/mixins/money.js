import { VMoney, Money } from 'v-money';

export default {
    data() {
        return {
            price: 0,
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                suffix: '',
                precision: 2,
                masked: false,
            },
        };
    },

    directives: { money: VMoney },

    components: { 'money-mask': Money },
};
