const { latest } = require('../../database/services/lessons');

it('should get last lessons with favorites', async () => {
    const lessons = await latest(1);

    console.log(lessons);

    expect(lessons[0]).toBeDefined();
    expect(lessons[0]['favorites']).toBeDefined();
    expect(lessons[0]['lessonBuyed']['userHasLesson']).toBeDefined();
});
