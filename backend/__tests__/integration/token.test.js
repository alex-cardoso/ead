const request = require('supertest');
const app = require('../../src/app');

it('should get token and update user verified status', async (done) => {
    const response = await request(app).get(
        '/user/activate/34211024001423230220241587746283659'
    );

    expect(response.body).toBe('updated');

    done();
});

it('should get invalid token', async (done) => {
    const response = await request(app).get(
        '/user/activate/134330012024014434420441587743637607'
    );

    expect(response.status).toBe(400);
    expect(response.body).toBe('token_invalid');

    done();
});
