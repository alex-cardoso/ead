const {
    ForumPost,
    ForumLesson,
    ForumReply,
    User,
} = require('../../database/models');

const posts = async forumId => {
    try {
        const posts = await ForumLesson.findOne({
            where: {
                id: forumId,
            },
            include: [
                {
                    attributes: ['id', 'title', 'message', 'createdAt'],
                    model: ForumPost,
                    as: 'posts',
                    include: [
                        {
                            attributes: ['id', 'reply', 'createdAt'],
                            model: ForumReply,
                            as: 'replies',
                            include: [
                                {
                                    attributes: [
                                        'id',
                                        'name',
                                        'last_name',
                                        'avatar',
                                    ],
                                    model: User,
                                    as: 'user',
                                },
                            ],
                        },
                        {
                            attributes: ['id', 'name', 'last_name', 'avatar'],
                            model: User,
                            as: 'user',
                        },
                    ],
                },
            ],
        });
        return posts;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    posts,
};
