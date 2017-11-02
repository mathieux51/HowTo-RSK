import { GraphQLID as ID, GraphQLNonNull as NonNull } from 'graphql';
import { resolver } from 'graphql-sequelize';
import GifType from '../types/GifType';
import { Gif } from '../models';

const gif = {
  type: GifType,
  args: {
    id: {
      type: new NonNull(ID),
      description: 'The id of the gif',
    },
  },
  resolve: resolver(Gif),
};

export default gif;

// resolve({ request }) {
//     return (
//       request.gif && {
//         id: request.gif.id,
//         title: request.gif.title,
//         description: request.gif.description,
//         location: request.gif.location,
//       }
//     );
//   },
