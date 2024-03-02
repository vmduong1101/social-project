import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

const UserModel = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING
    },
    full_name: {
      type: DataTypes.STRING
    },
    user_name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default UserModel;