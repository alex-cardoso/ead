const { get_category, get_all, store, destroy, update } = require('../../database/services/category');

it('should get id category from slug', async done => {
    const category = await get_category('outdoors');

    expect(category).toHaveProperty('id');

    done();
});

it('should get all categories', async done => {
    const categories = await get_all();

    expect(categories).toHaveProperty('count');
    expect(categories).toHaveProperty('rows');
    expect(categories['rows'][0]['lessons']).toBeDefined();

    done();
});

it('should remove category', async () => {
    const deleted = await destroy(18);

    expect(deleted).toBe(1);
});

it('should create category', async () => {
    const created = await store({
        name: 'Category test',
        slug: 'category-test',
    });

    expect(created['id']).toBeDefined();
});

it('should update category', async () => {
    const updated = await update(30, { name: 'updated', slug: 'updated' });

    expect(updated).toContain(1);
});
