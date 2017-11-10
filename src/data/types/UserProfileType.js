import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UserProfile = new ObjectType({
  name: 'UserProfile',
  description: 'UserProfile description',
  fields: {
    userId: { type: new NonNull(ID) },
    displayName: { type: StringType },
    picture: { type: StringType },
    gender: { type: StringType },
    location: { type: StringType },
    website: { type: StringType },
  },
});

export default UserProfile;
