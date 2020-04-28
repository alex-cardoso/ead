const { validate_token } = require('../../database/services/token');

it('should check get valid token', async () => {
    const token_validate = await validate_token(
        '404342121122221102213441587743656732'
    );

    console.log(token_validate);

    expect(token_validate).toBe('token_valid');
});

it('should get invalid token', async () => {
    try {
        const token_validate = await validate_token(
            '34211024001423230220241587746283659'
        );

        expect(token_validate).toHaveProperty('id');
    } catch (error) {
        expect(error).toBe('token_invalid');
    }
});
