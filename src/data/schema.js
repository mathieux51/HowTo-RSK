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
