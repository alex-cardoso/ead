const request = require('supertest');
const app = require('../../src/app');

it('should buy lessons in array', async (done) => {
    const response = await request(app)
        .put('/lessons/buy')
        .send({
            lessons: JSON.stringify([1, 2, 3, 4]),
            total: 200,
        });

    console.log(response.body);

    expect(response.status).toBe(200);

    done();
});
