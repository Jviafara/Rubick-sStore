import crypto from 'crypto';
import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        salt: { type: String, required: true, select: false },
        isAdmin: { type: Boolean, default: false, required: true },
    },
    modelOptions
);

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.password = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');

    return this.password === hash;
};

const User = mongoose.model('User', userSchema);
export default User;
