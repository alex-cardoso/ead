const { my } = require('../../database/services/lessons');

it('should get lessons buyed of user', async () => {
    const lessons = await my(1, 16);

    expect(lessons['rows']).toBeDefined();
});
