const { find_lesson, lessons, update, destroy, store, search } = require('../../database/services/lessons');

it('should get lesson with github', async () => {
    const lesson = await find_lesson('regional-tactics-developer', 16);

    expect(lesson['github']).toBeDefined();
});

it('should get all lessons', async () => {
    const lessons_data = await lessons();

    expect(lessons_data['count']).toBeDefined();
    expect(lessons_data['rows']).toBeDefined();
    expect(lessons_data['rows'][0]['id']).toBeDefined();
});

it('should update lesson', async () => {
    const data = { title: 'title updated 2', slug: 'slug_updated', duration: '09:34:00', value: 12.0, categoryId: 5 };
    const updated = await update(294, data);

    expect(updated).toContain(1);
});

it('should delete lesson', async () => {
    const deleted = await destroy(293);

    expect(deleted).toBe(1);
});

it('should create lesson', async function () {
    const created = await store({
        userId: 1,
        title: 'teste 2',
        slug: 'teste-2',
        embed: 'ONLQeCWcxAY',
        duration: '00:12:32',
        description: 'lorem ipsum....',
        categoryId: 1,
        value: 0.8,
    });

    expect(created['id']).toBeDefined();
});

it('should search lesson', async () => {

    const searched = await search('forward', 1);

    expect(searched['rows']).toBeDefined();
    expect(searched['rows'].length).toBeGreaterThan(0);
});