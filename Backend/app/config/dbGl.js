
import Sequelize from 'sequelize';

const connectDB1 = new Sequelize('commitions', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: 'Asia/Colombo', // your timezone comes here, ex.: 'US/Hawaii'
});

export { connectDB1 };

 