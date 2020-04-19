const request = require('supertest');
const app = require('../../src/app');

it('should delete reply', async done => {
    const response = await request(app)
        .delete('/forum/reply/destroy')
        .query({ id: 12 });

    expect(response.body).toBe(1);

    done();
});
