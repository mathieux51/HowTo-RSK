import { GraphQLList as List } from 'graphql';
import { resolver } from 'graphql-sequelize';
import GifType from '../types/GifType';
import { Gif } from '../models';

const gifs = {
  type: new List(GifType),
  resolve: resolver(Gif),
};

export default gifs;

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
