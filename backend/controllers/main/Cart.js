const { lessons: cart_lessons } = require('../../database/services/cart');

const index = (request, response) => {
    response.render('../views/main/cart', {
        layout: 'main',
        title: process.env.PAGE_TITLE,
    });
};

const lessons = async (request, response) => {
    try {
        const { lessons } = request.query;

        let lessons_in_cart = [];

        if (lessons !== undefined) {
            lessons_in_cart = await cart_lessons(JSON.parse(lessons));
        }

        response.status(200).json(lessons_in_cart);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    index,
    lessons,
};
