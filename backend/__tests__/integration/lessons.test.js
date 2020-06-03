const request = require('supertest');
const app = require('../../src/app');

it('should get lessons', async (done) => {
    const response = await request(app).get('/lessons').query({
        page: 1,
    });

    expect(response.body['rows']).toBeDefined();
    expect(response.body['count']).toBeDefined();
    expect(response.body['rows'][0]['category']).toBeDefined();
    expect(response.status).toBe(200);

    done();
});

it('should store lesson', async (done) => {
    const response = await request(app)
        .post('/admin/lesson')
        .send({
            lesson: {
                userId: 1,
                title: 'teste 2',
                slug: 'teste-2',
                embed: 'UdcYVxO4Nvk',
                duration: '00:12:32',
                description: 'lorem ipsum....',
                categoryId: 1,
                value: 0.8,
            },
        });

    expect(response.body['id']).toBeDefined();
    expect(response.status).toBe(200);

    done();
});
