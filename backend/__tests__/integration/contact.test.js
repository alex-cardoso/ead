const request = require('supertest');
const app = require('../../src/app');

it('should store contact and send email', async (done) => {
    const response = await request(app).post('/contact').send({
        message: 'message to contact',
    });

    expect(response.status).toBe(200);

    done();
});
