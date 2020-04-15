const request = require('supertest');
const app = require('../../src/app');

it('should return and append next posts', async done => {
    const response = await request(app)
        .get('/forum/posts/more')
        .set('Accept', 'application/json')
        .query({
            lastPostId: 2,
            forumId: 4,
        });
    expect(response.body[0]).toHaveProperty('id');
    done();
});
