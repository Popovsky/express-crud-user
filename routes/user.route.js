const express = require('express');
const {userController} = require('./../controllers');
const {validateUser} = require('./../middleware');
const userRouter = express.Router();

userRouter.post('/user', validateUser.validateUserOnCreate, userController.createUser);
userRouter.get('/users', userController.getAllUsers);

userRouter
    .route('/users/:userId')
    .get(userController.getUser)
    .put(validateUser.validateUserOnUpdate, userController.updateUser)
    .delete(userController.removeUser);

module.exports = userRouter;