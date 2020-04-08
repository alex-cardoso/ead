const moeda = vue => {
    vue.filter('moeda', valor => {
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
};

module.exports = {
    moeda,
};
