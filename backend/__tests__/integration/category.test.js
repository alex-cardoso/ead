const request = require('supertest');
const app = require('../../src/app');

it('should get status 200 and return slug', async done => {
    const response = await request(app).get('/category/sports');

    expect(response.status).toBe(200);
    expect(response.body).toBe('sports');

    done();
});

it('should get lessons from category', async done => {
    const response = await request(app)
        .get('/category/lessons')
        .query({
            slug: 'outdoors',
        });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rows');
    expect(response.body).toHaveProperty('count');

    done();
});

it('should return status 200', async done => {
    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);

    done();
});

it('should get categories', async done => {
    const response = await request(app).get('/categories/data');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rows');
    expect(response.body).toHaveProperty('count');

    done();
});

it('should create category', async done => {
    const random_category = Math.ceil(Math.random() * 100);

    const response = await request(app)
        .post('/admin/category/store')
        .send({
            category: {
                name: 'Category Teste ' + random_category,
                slug: 'category-teste-' + random_category,
            },
        });

    expect(response.status).toBe(200);
    expect(response.body['id']).toBeDefined();

    done();
});

it('should delete category', async done => {
    const response = await request(app)
        .delete('/admin/category/destroy')
        .query({
            id: 21,
        });

    expect(response.status).toBe(200);
    expect(response.body).toBe(1);

    done();
});

it('should update category', async done => {
    const response = await request(app)
        .put('/admin/category/update')
        .send({
            id: 30,
            name: 'name updated',
            slug: 'name-updated',
        });

    expect(response.status).toBe(200);
    expect(response.body).toContain(1);

    done();
});
