const { send_new_contact } = require('../../src/email');

it('should send email from contact', async () => {
    const send = await send_new_contact(
        {
            name: 'Alexandre',
        },
        'message from form contact'
    );

    expect(send.messageId).toBeDefined();
});
