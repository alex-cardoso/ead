const getUser = (request) => {
    try {
        if (!request['user']) {
            throw 'not_logged_in';
        }

        return request['user'];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUser,
};
