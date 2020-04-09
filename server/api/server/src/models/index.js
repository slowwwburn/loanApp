import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import Sequelize from 'sequelize';
import configJson from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

console.log(chalk.green('this is the environment: '), env);

const db = {};

let sequelize;

if (config.environment === 'production') {
  sequelize = new Sequelize(
    process.env[config.use_env_variable], config
  );
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOption: {
      ssl: true,
      native: true
    },
    logging: true
  }
  )
}
if (config.use_env_variable) {
  // From the environment, extract the key with the name provided in the config as use_env_variable
  // and use that to establish a connection to our database.
  sequelize = new Sequelize(process.env[config.use_env_variable], { dialect: 'postgres' });
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
}

// let sequelize;
// if (config.use_env_variable) {
//   // From the environment, extract the key with the name provided in the config as use_env_variable
//   // and use that to establish a connection to our database.
//   sequelize = new Sequelize(process.env[config.use_env_variable], {dialect: 'postgres'});
// } else {
//   sequelize = new Sequelize(
//     config.database, config.username, config.password, config
//   );
// }
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) &&
      (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;