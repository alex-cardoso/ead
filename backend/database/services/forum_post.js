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
                    model: ForumPost,
                    as: 'posts',
                    include: [
                        {
                            model: ForumReply,
                            as: 'replies',
                            include: [
                                {
                                    model: User,
                                    as: 'user',
                                },
                            ],
                        },
                        {
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
