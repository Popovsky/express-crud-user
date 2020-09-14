let primaryKey = 0;
const db = new Map();

class UserModel {
    constructor(props) {
        for (const key in props) {
            if (props.hasOwnProperty(key)) {
                this[key] = props[key];
            }
        }
        this.id = String(primaryKey++);
    }

    static create(values) {
        const newUser = new UserModel(values);
        db.set(newUser.id.toString(), newUser);
        return Promise.resolve(newUser);
    };

    static findById(userId) {
        return Promise.resolve(db.get(userId));
    };

    static findAll() {
        return Promise.resolve([...db.values()]);
    };

    static remove(userId) {
        return Promise.resolve(db.delete(userId));
    };

    update(values) {
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                this[key] = values[key];
            }
        }
        return Promise.resolve(this);
    }
}

module.exports = UserModel;

// set data to DB
db.set(
    String(++primaryKey),
    new UserModel({
        firstName: 'Test',
        lastName: 'Testov',
        email: 'test@testov.com',
        age: 56,
        gender: 'other',
        password: 'jsgj12GGHkkk',
    })
);