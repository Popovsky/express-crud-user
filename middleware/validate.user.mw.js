const yup = require('yup');

const USER_CREATE_SCHEMA = yup.object({
    firstName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    email: yup.string().email().trim().required(),
    age: yup.number().integer().min(0).max(120).required(),
    gender: yup.string().oneOf(['male', 'female', 'other']).required(),
    password: yup.string().matches(
        /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d|.*?[~`!@#$%^&*()_+=\-\\|/<>{},.?"':;\[\]])(?!.*?\s)^.{8,}$/,
        'Your password must be at least 8 characters long, be of mixed case and also contain a digit. '
    ).required(),
});

const USER_UPDATE_SCHEMA = yup.object({
    firstName: yup.string().trim(),
    lastName: yup.string().trim(),
    email: yup.string().email().trim(),
    age: yup.number().integer().min(0).max(120),
    gender: yup.string().oneOf(['male', 'female', 'other']),
    password: yup.string().matches(
        /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d|.*?[~`!@#$%^&*()_+=\-\\|/<>{},.?"':;\[\]])(?!.*?\s)^.{8,}$/,
        'Your password must be at least 8 characters long, be of mixed case and also contain a digit. '
    ),
});

module.exports.validateUserOnCreate = async (req, res, next) => {
    const {body} = req;
    try {
        req.body = await USER_CREATE_SCHEMA.validate(body);
        next();
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
};

module.exports.validateUserOnUpdate = async (req, res, next) => {
    const {body} = req;
    try {
        req.body = await USER_UPDATE_SCHEMA.validate(body);
        next();
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
};