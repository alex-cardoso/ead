const request = require('supertest');
const app = require('../../src/app');

it('should create reply', async done => {
    const response = await request(app)
        .post('/forum/reply')
        .send({
            postUser: {
                id: 1,
                name: 'Alexandre',
                last_name: 'Cardoso',
                email: 'xandecar@hotmail.com',
                receive_email_reply_forum: 1,
            },
            forumPostId: 2,
            lessonId: {
                id: 299,
                slug: 'slug-teste',
            },
            message: 'respondido',
        });

    expect(response.body['id']).toBeDefined();

    done();
});
