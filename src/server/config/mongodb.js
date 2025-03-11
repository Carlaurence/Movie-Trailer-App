const mongoose = require('mongoose');
const { db_mongodbConfig } = require('../../../config');
mongoose.set('strictQuery', true); //Solo permita guardar en la base de datos aquellos campos que estén definidos en el esquema
const connectionDB = async () => {
  try {
    const stringConnection = await mongoose.connect(`${db_mongodbConfig.host}:${db_mongodbConfig.port}/${db_mongodbConfig.name}`);
    
    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(`error : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectionDB;
