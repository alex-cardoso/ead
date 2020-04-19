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
                    attributes: ['id', 'message', 'createdAt'],
                    model: ForumPost,
                    as: 'posts',
                    subQuery: false,
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
                                        'email',
                                        'last_name',
                                        'avatar',
                                        'receive_email_reply_forum',
                                    ],
                                    model: User,
                                    as: 'user',
                                },
                            ],
                        },
                        {
                            attributes: [
                                'id',
                                'name',
                                'last_name',
                                'email',
                                'avatar',
                                'receive_email_reply_forum',
                            ],
                            model: User,
                            as: 'user',
                        },
                    ],
                    limit: 50,
                    order: [['id', 'ASC']],
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
            attributes: ['id', 'message', 'createdAt'],
            where: {
                forumId,
                id: {
                    [Op.gt]: lastPostId,
                },
            },
            subQuery: false,
            order: [['id', 'ASC']],
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
                                'email',
                                'avatar',
                                'receive_email_reply_forum',
                            ],
                            model: User,
                            as: 'user',
                        },
                    ],
                },
                {
                    attributes: [
                        'id',
                        'name',
                        'last_name',
                        'email',
                        'avatar',
                        'receive_email_reply_forum',
                    ],
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

const update = async (id, message) => {
    try {
        const update = await ForumPost.update(
            {
                message,
            },
            {
                where: {
                    id,
                },
            }
        );

        return update;
    } catch (error) {
        throw error;
    }
};

const create = async (userId, lessonId, forumId, message) => {
    try {
        const created = await ForumPost.create({
            userId,
            lessonId,
            forumId,
            message,
        });

        return created;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const destroy = async id => {
    try {
        const deleted = await ForumPost.destroy({
            where: {
                id,
            },
        });

        return deleted;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    posts,
    more_posts,
    create,
    update,
    destroy,
};
