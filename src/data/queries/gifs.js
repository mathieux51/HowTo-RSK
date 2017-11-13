import { GraphQLList as List, GraphQLString as StringType } from 'graphql';
import { resolver } from 'graphql-sequelize';
import GifType from '../types/GifType';
import { Gif } from '../models';

const gifs = {
  type: new List(GifType),
  args: {
    filter: { type: StringType, description: 'Search' },
  },
  resolve: resolver(Gif, {
    after: (result, args) => {
      if (args.filter) {
        return result.reduce((acc, cur) => {
          if (
            cur.dataValues.title.match(new RegExp(args.filter, 'i')) ||
            cur.dataValues.description.match(new RegExp(args.filter, 'i'))
          ) {
            acc.push(cur);
          }
          return acc;
        }, []);
      }
      return result;
    },
  }),
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
