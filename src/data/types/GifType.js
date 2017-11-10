import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const GifType = new ObjectType({
  name: 'Gif',
  description: 'Gif description',
  fields: {
    id: { type: new NonNull(ID) },
    title: { type: new NonNull(StringType) },
    description: { type: StringType },
    location: { type: new NonNull(StringType) },
    createdBy: { type: StringType },
  },
});

export default GifType;
