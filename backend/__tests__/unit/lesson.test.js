const { find_lesson } = require('../../database/services/lessons');

it('should get lesson with github', async () => {
    const lesson = await find_lesson('regional-tactics-developer', 16);

    expect(lesson['github']).toBeDefined();
});
