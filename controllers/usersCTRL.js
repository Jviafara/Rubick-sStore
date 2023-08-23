import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';
import User from '../models/user.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //Register User
        const user = new User();

        user.name = name;
        user.email = email;
        user.setPassword(password);

        await user.save();

        // Login
        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        responseHandler.created(res, { token, ...user._doc, id: user.id });
    } catch (error) {
        responseHandler.error(res);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select(
            'email password salt id name isAdmin'
        );

        if (!user)
            return responseHandler.badRequest(
                res,
                'Username or Password incorrect'
            );

        if (!user.validPassword(password))
            return responseHandler.badRequest(
                res,
                'Username or Password incorrect'
            );

        // Login
        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        user.password = undefined;
        user.salt = undefined;

        responseHandler.created(res, { token, ...user._doc, id: user.id });
    } catch (error) {
        responseHandler.error(res);
    }
};

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const user = await User.findById(req.user.id).select(
            'password id salt'
        );

        if (!user) return responseHandler.unauthorize(res);

        if (!user.validPassword(password))
            return responseHandler.badRequest(res, 'Wrong password');

        user.setPassword(newPassword);

        await user.save();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const getinfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select(
            'name email isAdmin id createdAt'
        );

        if (!user) return responseHandler.notFound(res);

        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res);
    }
};

const update = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user.id).select('name email id');

        if (!user) return responseHandler.unauthorize(res);

        //Update User
        user.name = name;
        user.email = email;

        await user.save();

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );
        responseHandler.created(res, { token, ...user._doc, id: user.id });
    } catch {
        responseHandler.error(res);
    }
};

const changeRol = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.id).select('isAdmin');

        if (!user.isAdmin) return responseHandler.unauthorize(res);

        const user2 = await User.findById(id).select('isAdmin');
        if (!user2) return responseHandler.notFound();

        user2.isAdmin = !user2.isAdmin;

        await user2.save();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const usersList = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('isAdmin');
        if (!user.isAdmin) return responseHandler.unauthorize(res);

        //Usesr List
        const users = await User.find();

        responseHandler.ok(res, users);
    } catch {
        responseHandler.error(res);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user.id).select('isAdmin');

        if (!user.isAdmin) return responseHandler.unauthorize(res);

        await User.findByIdAndDelete(id);

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

export default {
    register,
    login,
    updatePassword,
    getinfo,
    update,
    changeRol,
    remove,
    usersList,
};
