const request = require('supertest');
const app = require('../../src/app');

it('should get user', async done => {
    const response = await request(app).get('/user/1');

    expect(response.body['id']).toBeDefined();
    expect(response.body['id']).toBe(1);

    done();
});
