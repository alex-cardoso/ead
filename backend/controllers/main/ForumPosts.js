const { posts } = require('../../database/services/forum_post');

const data = async (request, response) => {
    try {
        const { forumId } = request.query;

        if (!forumId || forumId === '') {
            throw 'forum_not_exist';
        }

        const posts_forum = await posts(forumId);

        if (!posts_forum) {
            throw 'posts_not_exist';
        }

        return response.status(200).json(posts_forum);
    } catch (error) {
        response.status(400).json(error);
    }
};

module.exports = {
    data,
};
