const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../../database/services/user');

it('should get user and check password', async () => {
    const user = await findUserByEmail('alecar2007@gmail.com');

    const password_check = bcrypt.compareSync('123', user.password);

    expect(user).toHaveProperty('id');
    expect(password_check).toBe(true);
});
