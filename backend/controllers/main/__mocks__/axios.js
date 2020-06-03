const post = (url) => {
    return new Promise((resolve, reject) => {
        resolve({
            data: {
                success: true,
                score: 0.5,
            },
        });
    });
};

module.exports = {
    post,
};
