const { find_lesson } = require('../../database/services/lessons');

it('should return favorites from lesson', async () => {
    const lesson = await find_lesson('chief-operations-executive', 1);
    expect(lesson).toHaveProperty('favorites');
});
