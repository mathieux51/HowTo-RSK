import { resolver } from 'graphql-sequelize';
import UserProfileType from '../types/UserProfileType';
import { UserProfile } from '../models';

const userProfile = {
  type: UserProfileType,
  resolve: resolver(UserProfile),
};

export default userProfile;
