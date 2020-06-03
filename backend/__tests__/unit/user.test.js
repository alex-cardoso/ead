const { get_all, search } = require('../../database/services/user');

it('should get all users', async () => {
    const users = await get_all(1);

    expect(users['rows']).toBeDefined();
    expect(users['rows'][0]).toBeDefined();
    expect(users['rows'][0]['buyed']).toBeDefined();
});

it('should search user', async () => {
    const users = await search('Oran51@yahoo.com', 1);

    expect(users['rows']).toBeDefined();
    expect(users['rows'][0]).toBeDefined();
    expect(users['rows'][0]['buyed']).toBeDefined();
});
