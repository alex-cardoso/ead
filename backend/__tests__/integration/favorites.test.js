const request = require('supertest');
const app = require('../../src/app');

it('should get status 200 and favorites', async (done) => {
    const response = await request(app).get('/favorites').query({
        lessonId: 299,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('favorites');
    expect(response.body).toHaveProperty('user');
    done();
});

it('should add favorite', async (done) => {
    const response = await request(app).post('/favorites').send({
        lessonId: 299,
        userId: 1,
    });

    expect(response.status).toBe(200);
    done();
});

it('should remove favorite', async (done) => {
    const response = await request(app).delete('/favorites').query({
        id: 299,
    });

    expect(response.status).toBe(200);
    done();
});

it('should get favorites from user', async (done) => {
    const response = await request(app).get('/favorites/user').query({
        userId: 1,
    });

    expect(response.status).toBe(200);
    expect(response.body[0]).toBeDefined();
    done();
});
