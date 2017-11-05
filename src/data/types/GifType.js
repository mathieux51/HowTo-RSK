import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const GifType = new ObjectType({
  name: 'Gif',
  description: 'GifType description',
  fields: {
    id: { type: new NonNull(ID) },
    title: { type: StringType },
    description: { type: StringType },
    location: { type: StringType },
  },
});

export default GifType;
