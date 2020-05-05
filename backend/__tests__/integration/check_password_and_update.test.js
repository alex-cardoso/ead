const request = require('supertest');
const app = require('../../src/app');

it('should check password', async (done) => {
    const response = await request(app)
        .put('/profile/update')
        .send({
            password_to_confirm: 'alecar',
            user: {
                name: 'Alexandre',
                last_name: 'Cardoso',
                email: 'alecar2007@gmail.com',
                password: 'alecar2020',
            },
        });

    expect(response.status).toBe(200);
    expect(response.body).toBe('updated');

    done();
});

it('should check password and not match', async (done) => {
    const response = await request(app)
        .put('/profile/update')
        .send({
            password_to_confirm: '123',
            user: {
                name: 'Alexandre',
                last_name: 'Cardoso',
                email: 'alecar2007@gmail.com',
                password: '123',
            },
        });

    expect(response.status).toBe(400);
    expect(response.body).toBe('password_not_match');

    done();
});

it('should get errors validate', async (done) => {
    const response = await request(app)
        .put('/profile/update')
        .send({
            password_to_confirm: '123',
            user: {
                name: '',
                last_name: 'Cardoso',
                email: 'alecar2007@gmail.com',
                password: 'alecar',
            },
        });

    console.log(response.body);

    expect(response.status).toBe(422);

    done();
});

it('should check password and update user', async (done) => {
    const response = await request(app)
        .put('/profile/update')
        .send({
            password_to_confirm: 'alecar2020',
            user: {
                name: 'Alexandre',
                last_name: 'Cardoso',
                email: 'alecar2007@gmail.com',
                password: 'alecar2020!!',
            },
        });

    console.log(response.body);

    expect(response.status).toBe(200);

    done();
});
