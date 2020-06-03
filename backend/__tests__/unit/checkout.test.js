const { store } = require('../../database/services/checkout');

it('should create checkout in database', async () => {
    try {
        const response = await store(1, '4863874ghhie84', 100.98);

        expect(response).toHaveProperty('id');
    } catch (error) {
        console.log(error);
    }
});
