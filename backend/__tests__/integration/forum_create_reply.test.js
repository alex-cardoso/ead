const request = require('supertest');
const app = require('../../src/app');
jest.mock('../../database/services/forum_reply');

it('should create reply', async done => {
    const requestApp = request(app);
    const response = await requestApp.post('/forum/reply').send({
        postUser: {
            id: 1,
            name: 'Alexandre',
            last_name: 'Cardoso',
            email: 'xandecar@hotmail.com',
            receive_email_reply_forum: 1,
        },
        forumPostId: 2,
        lesson: {
            id: 299,
            slug: 'slug-teste',
        },
        message: 'respondido',
    });

    expect(response.status).toBe(200);
    expect(response.body['id']).toBeDefined();

    done();
});
