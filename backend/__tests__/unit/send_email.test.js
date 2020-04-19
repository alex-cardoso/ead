const { send_new_reply } = require('../../src/email');
it('should send email new reply', async () => {
    const email_send = await send_new_reply(
        'xandecar@hotmail.com',
        'Alexandre Cardoso',
        'Joao Teste',
        'Meu post'
    );

    expect(email_send.messageId).toBeDefined();
});
