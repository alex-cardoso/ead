const { add_buyed_lesson } = require('../../database/services/lessons_buyed');

it('should buy many lessons at once and update credits', async () => {
    try {
        const lessons_in_cart = [250, 278, 254, 190];

        const promises = [];

        lessons_in_cart.forEach((lesson) => {
            promises.push(add_buyed_lesson(1, lesson));
        });

        await Promise.all(promises);
    } catch (error) {
        console.log(error);
    }
});
