const { category } = require('../../database/services/lessons');

it('should return categories with paginations', async (done) => {
    const lessons = await category(1, 1, 5);

    expect(lessons).toHaveProperty('count');
    expect(lessons).toHaveProperty('rows');

    done();
});
