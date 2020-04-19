const request = require('supertest');
const app = require('../../src/app');

it('should delete post and replies', async done => {
    const response = await request(app)
        .delete('/forum/post/destroy')
        .query({ id: 1 });

    expect(response.body).toBe(1);

    done();
});
