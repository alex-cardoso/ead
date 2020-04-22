const request = require('supertest');
const app = require('../../src/app');

it('should get status 200 and return slug', async (done) => {
    const response = await request(app).get('/category/sports');

    expect(response.status).toBe(200);
    expect(response.body).toBe('sports');

    done();
});

it('should get lessons from category', async (done) => {
    const response = await request(app).get('/category/lessons').query({
        slug: 'outdoors',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rows');
    expect(response.body).toHaveProperty('count');

    done();
});

it('should return status 200', async (done) => {
    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);

    done();
});

it('should get categories', async (done) => {
    const response = await request(app).get('/categories/data');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rows');
    expect(response.body).toHaveProperty('count');

    done();
});
