import { DataTypes } from 'sequelize';
// import bcrypt from 'bcryptjs';
import { connectDB1 } from '../config/dbGl.js';

const tradecommition = connectDB1.define('tradecommition', {
  id: {
    type: DataTypes.STRING,
    // required: true,
    unique: true,
    primaryKey: true,
  },
  comId: {
    type: DataTypes.STRING,
    required: true,
  },
  iNo: {
    type: DataTypes.STRING,
    required: true,
  },
  com: {
    type: DataTypes.STRING,
    required: true,
  },
  comAmt: {
    type: DataTypes.STRING,
    required: true,
  },
  refNumber: {
    type: DataTypes.STRING,
    required: true,
  },
  paidTo: {
    type: DataTypes.STRING,
    required: true,
  },
  tradeCommitionDate: {
    type: DataTypes.STRING,
    required: true,
  },
  totalCommitionAmt: {
    type: DataTypes.STRING,
    required: true,
  },
  selectedItems: {
    type: DataTypes.STRING,
    required: true,
  },

},
  {

    tableName: 'tradecom',
    timestamps: false,

  });



export { tradecommition };