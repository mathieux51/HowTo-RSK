import DataType from 'sequelize';
import bcrypt from 'bcrypt';
import Model from '../sequelize';

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    }, // https://stackoverflow.com/questions/34120548/using-bcrypt-with-sequelize-model
  },
  {
    indexes: [{ fields: ['email'] }],
    underscored: true,
  },
);

User.prototype.generateHash = pwd => bcrypt.hash(pwd, bcrypt.genSaltSync(8));

User.prototype.validPassword = function validPassword(pwd) {
  return bcrypt.compare(pwd, this.password);
};

export default User;
