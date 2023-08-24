import privateClient from '../client/privateClient';
import publicClient from '../client/publicClient';

const userEndpoints = {
    signin: 'user/login',
    signup: 'user/register',
    getInfo: 'user/info',
    passwordUpdate: 'user/update-password',
    update: 'user/update',
    getList: 'user/users-list',
    changeRol: ({ userId }) => `user/change-rol/${userId}`,
    remove: ({ userId }) => `user/${userId}`,
};

const userApi = {
    signin: async ({ email, password }) => {
        try {
            const response = await publicClient.post(userEndpoints.signin, {
                email,
                password,
            });
            return { response };
        } catch (err) {
            return { err };
        }
    },
    signup: async ({ email, password, confirmPassword, name }) => {
        try {
            const response = await publicClient.post(userEndpoints.signup, {
                email,
                password,
                confirmPassword,
                name,
            });
            return { response };
        } catch (err) {
            return { err };
        }
    },
    getInfo: async () => {
        try {
            const response = await privateClient.get(userEndpoints.getInfo);
            return { response };
        } catch (err) {
            return { err };
        }
    },
    passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
        try {
            const response = await privateClient.put(
                userEndpoints.passwordUpdate,
                { password, newPassword, confirmNewPassword }
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    update: async ({ name, email }) => {
        try {
            const response = await privateClient.put(userEndpoints.update, {
                name,
                email,
            });
            return { response };
        } catch (err) {
            return { err };
        }
    },
    getList: async () => {
        try {
            const response = await privateClient.get(userEndpoints.getList);
            return { response };
        } catch (err) {
            return { err };
        }
    },
    changeRol: async ({ userId }) => {
        try {
            const response = await privateClient.put(
                userEndpoints.changeRol({ userId })
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    remove: async ({ userId }) => {
        try {
            const response = await privateClient.delete(
                userEndpoints.remove({ userId })
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
};

export default userApi;
