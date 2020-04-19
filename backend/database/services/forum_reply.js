const { ForumReply } = require('../../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const destroy = async id => {
    try {
        const deleted = await ForumReply.destroy({
            where: {
                id,
            },
        });

        return deleted;
    } catch (error) {
        throw error;
    }
};

const update = async (id, reply) => {
    try {
        const updated = await ForumReply.update(
            {
                reply,
            },
            {
                where: {
                    id,
                },
            }
        );

        return updated;
    } catch (error) {
        throw error;
    }
};

const create = async (userId, forumPostId, lessonId, reply) => {
    try {
        return await ForumReply.create({
            userId,
            forumPostId,
            lessonId,
            reply,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    create,
    update,
    destroy,
};
