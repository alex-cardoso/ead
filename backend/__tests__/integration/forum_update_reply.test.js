const request = require('supertest');
const app = require('../../src/app');

it('should update reply', async done => {
    const response = await request(app)
        .put('/forum/reply/update')
        .set('Accept', 'application/json')
        .send({
            data: {
                id: 13,
                reply: 'lorem ipsum dolet',
            },
        });
    expect(response.body).toContain(1);
    done();
});
