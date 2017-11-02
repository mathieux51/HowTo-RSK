import { GraphQLList as List } from 'graphql';
import { resolver } from 'graphql-sequelize';
import GifType from '../types/GifType';
import { Gif } from '../models';

const gifs = {
  type: new List(GifType),
  resolve: resolver(Gif),
};

export default gifs;
