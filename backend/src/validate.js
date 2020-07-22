const repeated_letters = (value) => {
    if (/([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]).*?\1{2,}/.test(value)) {
        throw 'error_repeated_letters';
    }
};

const many_upper_case = (value) => {
    if (!/^[A-Z][a-z\u00C0-\u024F\u1E00-\u1EFF]*$/.test(value)) {
        throw 'many_upper_case';
    }
};

module.exports = {
    repeated_letters,
    many_upper_case,
};
