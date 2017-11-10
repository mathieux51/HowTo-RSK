import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';
import userJwt from './queries/userJwt';
import news from './queries/news';
import gif from './queries/gif';
import gifs from './queries/gifs';
import userProfile from './queries/userProfile';

const queryType = new ObjectType({
  name: 'Query',
  fields: {
    userJwt,
    userProfile,
    news,
    gif,
    gifs,
  },
});

const schema = new Schema({
  query: queryType,
});

export default schema;

// const createGif = (id, title, description, location) => ({
//   id,
//   title,
//   description,
//   location,
// });

// const mutationType = new ObjectType({
//   name: 'Mutation',
//   description: 'The root Mutation type.',
//   fields: {
//     createGif: {
//       type: GifType,
//       args: {
//         id: {
//           type: new NonNull(StringType),
//           description: 'The id of the gif.',
//         },
//         title: {
//           type: new NonNull(StringType),
//           description: 'The title of the fi.',
//         },
//         description: {
//           type: new NonNull(StringType),
//           description: 'The description of the gif.',
//         },
//         location: {
//           type: new NonNull(StringType),
//           description: 'Where the file can be found on the server.',
//         },
//       },
//       resolve: (_, args) => createGif(args),
//     },
//   },
// });
