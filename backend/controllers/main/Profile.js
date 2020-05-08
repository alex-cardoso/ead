const {
    check_password_and_update_user,
} = require('../../database/services/profile');

const {
    check_email_exist_another_users,
    findUser,
} = require('../../database/services/user');

const { validationResult } = require('express-validator');
const { errors_formatted } = require('../../src/helpers');

const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const index = (request, response) => {
    response.render('../views/main/profile', {
        layout: 'main',
        user: JSON.stringify(request.user),
        title: process.env.PAGE_TITLE,
    });
};

const update = async (request, response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(422).json(errors_formatted(errors));
        }
        const { password_to_confirm, user } = request.body;

        const email_logged_in = request.user['email'];

        const exist_email = await check_email_exist_another_users(
            request.user['id'],
            user.email
        );

        if (exist_email) {
            throw 'email_exist';
        }

        await check_password_and_update_user(
            email_logged_in,
            password_to_confirm,
            user
        );

        response.status(200).json('updated');
    } catch (error) {
        response.status(400).json(error);
    }
};

const avatar = async (request, response) => {
    try {
        const { filename: image } = request.file;

        const user = await findUser(request.user['id']);

        await sharp(request.file.path)
            .resize({
                width: 200,
                height: 200,
                fit: sharp.fit.cover,
            })
            .jpeg({ quality: 50 })
            .toFile(
                path.resolve(request.file.destination, 'avatar_resized', image)
            );

        fs.unlinkSync(request.file.path);

        if (user.avatar) {
            fs.unlinkSync(
                path.join(__dirname, '../../../frontend/dist/', user.avatar)
            );
        }

        user.avatar = '/uploads/avatar_resized/' + image;
        user.save();

        response.status(200).json({ msg: 'uploaded', avatar: image });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { index, update, avatar };
