const { update } = require('../../database/services/user');

it('should update user', async () => {
    const updated = await update({ password: '123456' }, 16);

    expect(updated).toContain(1);
});
