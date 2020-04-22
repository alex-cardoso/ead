const scroll = selector => {
    document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
};

module.exports = {
    scroll,
};
