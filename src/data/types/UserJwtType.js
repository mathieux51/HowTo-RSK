import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UserJwtType = new ObjectType({
  name: 'UserJWTType',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
  },
});

export default UserJwtType;
