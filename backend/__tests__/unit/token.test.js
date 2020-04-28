const { store } = require('../../database/services/token');
const { create_token } = require('../../src/helpers');

it('should create token', () => {
    const token = create_token();

    expect(token.length).toBeGreaterThan(0);
});

it('should store token', async () => {
    const token = create_token();

    const created = await store(1, token);

    expect(created).toHaveProperty('id');
});
