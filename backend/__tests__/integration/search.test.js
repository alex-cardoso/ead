const request = require('supertest');
const app = require('../../src/app');

it('should search lesson by title and description from api', async (done) => {
    const response = await request(app).get('/lessons/search').query({
        search: 'executive',
    });

    console.log(response.body);

    expect(response.body[0]).toBeDefined();
    expect(response.body[0]).toHaveProperty('id');
    done();
});
