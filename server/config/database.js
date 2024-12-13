import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('tenv', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;