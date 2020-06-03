const request = require('supertest');
const app = require('../../src/app');

it('should update if user want receive email when reply thread', async (done) => {
    const response = await request(app)
        .put('/profile/update/receive-email-reply')
        .send({
            id: 1,
            receive_email_reply_forum: 1,
        });

    expect(response.body).toContain(1);

    done();
});
