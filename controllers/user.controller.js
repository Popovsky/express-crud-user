const {UserModel} = require('./../models');

module.exports.createUser = async (req, res, next) => {
    const {body} = req;
    const createdUser = await UserModel.create(body);
    res.status(201).send(createdUser);
};
module.exports.getUser = async (req, res, next) => {
    const {
        params: {userId},
    } = req;

    const user = await UserModel.findById(userId);
    if (user) {
        return res.send(user);
    }
    res.status(404).send({
        message: `User with id "${userId}" not found`,
    });
};

module.exports.getAllUsers = async (req, res, next) => {
    const users = await UserModel.findAll();
    res.send(users);
};

module.exports.updateUser = async (req, res, next) => {
    const {
        params: {userId},
        body,
    } = req;
    const user = await UserModel.findById(userId);
    if (user) {
        const updatedUser = await user.update(body);
        res.send(updatedUser);
    }
    res.status(404).send({
        message: `User with id "${userId}" not found`,
    });
};
module.exports.removeUser = async (req, res, next) => {
    const {
        params: {userId},
    } = req;

    if (await UserModel.remove(userId)) {
        return res.status(204).send();
    }
    res.status(404).send({
        message: `User with id "${userId}" not found`,
    });
};