const request = require('supertest');
const app = require('../../src/app');
const bcrypt = require('bcrypt');

it('should return status 200', async (done) => {
    const response = await request(app).get('/signup');

    expect(response.status).toBe(200);
    done();
});

it('should create and send email with token', async (done) => {
    const response = await request(app).post('/signup').send({
        name: 'Alexandre',
        last_name: 'Cardoso',
        email: 'alecar2007@gmail.com',
        password: '123',
    });

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(200);
    done();
});
