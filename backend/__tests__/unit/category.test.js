const { get_category, get_all } = require('../../database/services/category');

it('should get id category from slug', async (done) => {
    const category = await get_category('outdoors');

    expect(category).toHaveProperty('id');

    done();
});

it('should get all categories and pagination', async (done) => {
    const categories = await get_all();

    expect(categories).toHaveProperty('count');
    expect(categories).toHaveProperty('rows');

    done();
});
