const request = require('supertest');
const app = require('../../src/app');

it('should get user', async (done) => {
    const response = await request(app).get('/user/1');

    expect(response.body['id']).toBeDefined();
    expect(response.body['id']).toBe(1);

    done();
});

it('should get all', async (done) => {
    const response = await request(app).get('/admin/users/data').query({
        page: 1,
    });

    expect(response.body['rows']).toBeDefined();
    expect(response.body['rows'][0]).toBeDefined();
    expect(response.body['rows'][0]['buyed']).toBeDefined();

    done();
});

it('should search user', async (done) => {
    const response = await request(app).get('/admin/users/search').query({
        searched: 'Oran51@yahoo.com',
        page: 1,
    });

    expect(response.body['rows']).toBeDefined();
    expect(response.body['rows'][0]).toBeDefined();
    expect(response.body['rows'][0]['buyed']).toBeDefined();

    done();
});
