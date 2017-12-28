import DataType from 'sequelize';
import Model from '../sequelize';

const Gif = Model.define(
  'Gif',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    title: {
      type: DataType.STRING(255),
    },
    description: {
      type: DataType.STRING(255),
    },
    location: {
      type: DataType.STRING(255),
    },
    created_by: {
      type: DataType.UUID,
    },
  },
  {
    underscored: true,
  },
);

export default Gif;
