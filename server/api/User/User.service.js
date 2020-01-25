import User from './user.model';

export const setUserAuthenticated = async (email) => {
    const user = await User.findOne().where('email').equals(email);

    user.isAuthenticated = true;

    await user.save();
};