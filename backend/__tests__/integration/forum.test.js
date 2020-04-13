const request = require('supertest');
const app = require('../../src/app');

it('should return forum id', async done => {
    const response = await request(app)
        .get('/forum')
        .set('Accept', 'application/json')
        .query({
            lesson: 1,
        });
    expect(response.body[0]).toHaveProperty('id');
    done();
});

it('should return posts from forum', async done => {
    const response = await request(app)
        .get('/forum/posts')
        .set('Accept', 'application/json')
        .query({
            forumId: 7,
        });
    expect(response.body).toHaveProperty('posts');
    expect(response.body).toHaveProperty('id');
    done();
});

it('should return error if forum not exist', async done => {
    const response = await request(app)
        .get('/forum/posts')
        .set('Accept', 'application/json')
        .expect(400)
        .query({
            // forumId: '',
            forumId: 8,
        });

    done();
});

it('should return user from post', async done => {
    const response = await request(app)
        .get('/forum/posts')
        .set('Accept', 'application/json')
        .query({
            forumId: 7,
        });

    expect(response.body).toHaveProperty('id');
    expect(response.body['posts'][0]).toBeDefined();
    expect(response.body['posts'][0]).toHaveProperty('user');

    done();
});

it('should return replies from post', async done => {
    const response = await request(app)
        .get('/forum/posts')
        .set('Accept', 'application/json')
        .query({
            forumId: 7,
        });

    expect(response.body).toHaveProperty('id');
    expect(response.body['posts'][0]).toBeDefined();
    expect(response.body['posts'][0]).toHaveProperty('replies');

    done();
});

it('should return user from reply', async done => {
    const response = await request(app)
        .get('/forum/posts')
        .set('Accept', 'application/json')
        .query({
            forumId: 7,
        });

    expect(response.body).toHaveProperty('id');
    expect(response.body['posts'][0]).toBeDefined();
    expect(response.body['posts'][0]['replies']).toBeDefined();
    expect(response.body['posts'][0]['replies'][0]).toHaveProperty('user');

    done();
});
