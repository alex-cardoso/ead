const transformar_em_slug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = 'ãàáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaaeeeeiiiioooouuuunc------';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};

const currency = (valor) => {
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
};

const scroll = (selector) => {
    document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
};

const months = (month) => {
    const months = {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
        8: 'Agosto',
        9: 'Setembro',
        10: 'Outubro',
        11: 'Novembro',
        12: 'Dezembro',
    };

    return months[month];
};

const strip_tags_except_markdown = (string) => {
    return string.replace(
        /(<([^>].*)>)(?=([^```\\]*(\\.|```([^```\\]*\\.)*[^```\\]*```))*[^```]*$)/gi,
        ''
    );
};

const errors_formatted = (errors) => {
    let errors_array = {};
    for (let error of errors['errors']) {
        errors_array[error['param']] = error['msg'];
    }

    return errors_array;
};

const create_token = () => {
    return Math.random().toString(5).substr(2) + new Date().getTime();
};

module.exports = {
    transformar_em_slug,
    currency,
    scroll,
    months,
    strip_tags_except_markdown,
    errors_formatted,
    create_token,
};
