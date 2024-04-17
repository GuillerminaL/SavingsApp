import User from './user';

const googleAuthDal = {

    registerWithGoogle: async (oauthUser: any) => {
        const response = { success: false, message: 'Error while registering user'};
        const existsUser = await User.findOne({
            email: oauthUser.emails[0].value,
        });
        if ( existsUser ) {
            response.success = false;
            response.message = 'Email already registered';
        } else {
            const user = new User({
                email: oauthUser.emails[0].value,
                name: oauthUser.displayName,
                accountId: oauthUser.id,
                photoURL: oauthUser.photos[0].value,
                provider: oauthUser.provider
            });
            const newUser = await user.save();
            if ( newUser ) {
                response.success = true;
                response.message = 'User registered';
            }
        }
        return response;
    }
}

export default googleAuthDal;