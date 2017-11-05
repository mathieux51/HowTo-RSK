import DataType from 'sequelize';
import Model from '../sequelize';

const Gif = Model.define('Gif', {
  id: {
    type: DataType.UUID,
    primaryKey: true,
  },

  title: {
    type: DataType.STRING(100),
  },

  description: {
    type: DataType.STRING(255),
  },

  location: {
    type: DataType.STRING(50),
  },

  createdBy: {
    type: DataType.STRING(50),
  },
});

export default Gif;
