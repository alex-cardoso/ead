const data = async (request, response) => {
    try {
        response.status(200).json('posts');
    } catch (error) {
        response.status(400).json(error);
    }
};

module.exports = {
    data,
};
