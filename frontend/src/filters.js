const filters = {
    vueInstance: function(vue) {
        this.vue = vue;
    },

    moeda: function() {
        this.vue.filter('moeda', valor => {
            if (valor !== null && valor !== undefined) {
                if (valor > 0 && toString(valor).includes('R$')) {
                    return valor.trim();
                }

                var formatter = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                });

                return formatter.format(valor);
            }
        });
    },

    date: function() {
        this.vue.filter('date', date => {
            var formatter = new Intl.DateTimeFormat('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            return formatter.format(date);
        });
    },
};

export { filters };
