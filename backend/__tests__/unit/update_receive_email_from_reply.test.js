const {
    update_receive_email_reply_forum,
} = require('../../database/services/profile');

it('should update if user want receive email from reply', async () => {
    const update = await update_receive_email_reply_forum(1, 2);

    expect(update).toContain(1);
});
