import { resolver } from 'graphql-sequelize';
import UserProfileType from '../types/UserProfileType';
import { UserProfile } from '../models';

const userProfile = {
  type: UserProfileType,
  resolve: resolver(UserProfile),
};

export default userProfile;

// GraphQLInt as Int,
// GraphQLString as String,
// args: {
//   limit: {
//     type: Int,
//       description:
//     'An arg with the key limit will automatically be converted to a limit on the target',
//   },
//   order: {
//     type: String,
//       description:
//     'An arg with the key order will automatically be converted to a order on the target',
//   },
// },
