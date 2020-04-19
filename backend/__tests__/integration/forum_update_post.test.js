const request = require('supertest');
const app = require('../../src/app');

it('should update post', async done => {
    const response = await request(app)
        .put('/forum/post/update')
        .set('Accept', 'application/json')
        .send({
            data: {
                id: 1,
                message: 'updated',
            },
        });
    console.log(response.body);
    expect(response.body).toContain(1);
    done();
});
