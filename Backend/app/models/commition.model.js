import { DataTypes } from 'sequelize';
// import bcrypt from 'bcryptjs';
import { connectDB1 } from '../config/dbGl.js';

const commition = connectDB1.define('commition', {
  id: {
    type: DataTypes.STRING,
    // required: true,
    unique: true,
    primaryKey: true,

  },
  iNo: {
    type: DataTypes.STRING,
    required: true,
  },
  cusDet: {
    type: DataTypes.STRING,
    required: true,
  },
  
  iDate: {
    type: DataTypes.DATE,
    required: true,
  },
  nvia: {
    type: DataTypes.STRING,
    required: true,
  },
  sDis: {
    type: DataTypes.STRING,
    required: true,
  },
  sDisRe: {
    type: DataTypes.STRING,
    required: true,
  },
  
  
},
{
    tableName: 'commition', 
    timestamps: false,

  });
 

 
export  { commition };