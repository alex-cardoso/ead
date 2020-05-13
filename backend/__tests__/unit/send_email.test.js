const {
    send_new_reply,
    send_new_reset_password_link,
} = require('../../src/email');

it('should send email new reply', async () => {
    const email_send = await send_new_reply(
        'xandecar@hotmail.com',
        'Alexandre Cardoso',
        'Joao Teste',
        'Meu post'
    );

    expect(email_send.messageId).toBeDefined();
});

it('should send email with link reset password', async () => {
    const email_send = await send_new_reset_password_link(
        {
            email: 'xandecar@hotmail.com',
            name: 'Alexandre',
        },
        'kfdkjfhdfjd787'
    );

    expect(email_send.messageId).toBeDefined();
});
