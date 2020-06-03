const {
    favorites,
    destroy,
    create,
    favorites_from_user,
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

it('should list favorites from user', async () => {
    const response = await favorites_from_user(1);
    expect(response['rows']).toBeDefined();
    expect(response['rows'][0]['lesson']).toBeDefined();
    expect(response['rows'][0]['lesson']['category']).toBeDefined();
    expect(response['rows'][0]['lesson']['favorites']).toBeDefined();
    expect(response['rows'][0]['user']).toBeDefined();
    expect(response['rows'][0]['lesson']['lessonBuyed']).toBeDefined();
});
