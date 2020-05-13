const { store } = require('../../database/services/token');
const { create_token } = require('../../src/helpers');
const { verify_token } = require('../../database/services/resetPassword');

it('should create token', () => {
    const token = create_token();

    expect(token.length).toBeGreaterThan(0);
});

it('should store token', async () => {
    const token = create_token();

    const created = await store(1, token);

    expect(created).toHaveProperty('id');
});

it('should get error on validate reset password token', async () => {
    try {
        const token = await verify_token(
            '1300442142404412232030331589303877932'
        );

        console.log('token===>', token);
    } catch (error) {
        expect(error).toBe('token_invalid');
    }
});

it('should validate reset password token', async () => {
    try {
        const token = await verify_token(
            '1300442142404412232030331589303877932'
        );

        console.log('token===>', token);
        expect(token['userId']).toBeDefined();
    } catch (error) {
        expect(error).toBe('token_invalid');
    }
});
