import UserJwtType from '../types/UserJwtType';

const userJWT = {
  type: UserJwtType,
  resolve({ req }) {
    return (
      req.user && {
        id: req.user.id,
        email: req.user.email,
      }
    );
  },
};

export default userJWT;
