const {
    ForumPost,
    ForumLesson,
    ForumReply,
    User,
} = require('../../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
                    limit: 20,
                },
            ],
        });
        return posts;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const more_posts = async (lastPostId, forumId) => {
    try {
        const posts = await ForumPost.findAll({
            attributes: ['id', 'title', 'message', 'createdAt'],
            where: {
                forumId,
                id: {
                    [Op.gt]: lastPostId,
                },
            },
            include: [
                {
                    attributes: ['id', 'reply', 'createdAt'],
                    model: ForumReply,
                    as: 'replies',
                    include: [
                        {
                            attributes: ['id', 'name', 'last_name', 'avatar'],
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
            limit: 20,
        });
        return posts;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    posts,
    more_posts,
};
