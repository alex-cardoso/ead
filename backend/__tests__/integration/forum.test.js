const request = require('supertest');
const app = require('../../src/app');
jest.mock('../../controllers/main/__mocks__/axios');
jest.mock('../../src/user', () => ({
    getUser: jest.fn().mockReturnValue({
        id: 1,
        name: 'Alexandre',
        last_name: 'Cardoso',
        email: 'alecar2007@gmail.com',
        password: '123',
    }),
}));

it('should create a new therad(post)', async (done) => {
    const response = await request(app).post('/forum/post').send({
        token: '22333',
        post: 'dkdslkd',
        forumId: 2,
        lessonId: 299,
        lessonSlug: 'chief-operations-executive',
    });

    expect(response.status).toBe(200);
    expect(response.body['id']).toBeDefined();

    done();
});
