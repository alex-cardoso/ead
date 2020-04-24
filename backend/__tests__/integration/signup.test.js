const request = require('supertest');
const app = require('../../src/app');
const bcrypt = require('bcrypt');

it('should return status 200', async (done) => {
    const response = await request(app).get('/signup');

    expect(response.status).toBe(200);
    done();
});

it('should return validations errors', async (done) => {
    const response = await request(app)
        .post('/signup')
        .send({
            name: 'Alexandre',
            last_name: '',
            email: 'xandecar',
            password: bcrypt.hashSync('123', 10),
        });

    console.log(response.body);

    expect(response.status).toBe(401);
    done();
});

it('should return validations errors formated', async (done) => {
    const response = await request(app)
        .post('/signup')
        .send({
            name: 'Alexandre',
            last_name: '',
            email: 'xandecar',
            password: bcrypt.hashSync('123', 10),
        });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('email');
    done();
});
