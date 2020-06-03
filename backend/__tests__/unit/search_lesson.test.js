const { search_lesson } = require('../../database/services/search');

it('should get lessons by search name or description content', async () => {
    const lessons = await search_lesson('executive', 3);

    expect(lessons[0]).toBeDefined();
    expect(lessons[0]).toHaveProperty('id');
});
