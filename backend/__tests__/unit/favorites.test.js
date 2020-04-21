const {
    favorites,
    destroy,
    create,
} = require('../../database/services/favorites');

it('should get favorites from lesson', async () => {
    const response = await favorites(299);
    expect(response[0]).toBeDefined();
    expect(response[0]).toHaveProperty('id');
});

it('should add in favorites', async () => {
    const response = await create(299, 2);
    expect(response[0]).toBeDefined();
    expect(response[0]).toHaveProperty('id');
});

it('should remove from favorites', async () => {
    const response = await destroy(7);
    expect(response).toBe(1);
});
