const { lessons } = require('../../database/services/cart');

it('should get lessons in database from cart', async () => {
    const lessons_in_cart = [299, 234, 190];

    const response = await lessons(lessons_in_cart);

    expect(response[0]).toBeDefined();
    expect(response[0]['id']).toBeDefined();
});
