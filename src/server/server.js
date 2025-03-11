const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { appConfig } = require('../../config');
//MONGODB MODULE
const connectionDB = require('../server/config/mongodb');
//SET DB CONNECTION
connectionDB();
app.use(cors());
const morgan = require('morgan');
//IMPORT ROUTES
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
//MIDDLEWARE TO PARSE JSON TO OBJECT
app.use(express.json()); //convert json into object

//MIDDLEWARE TO SHOW HTTP RESQUEST IN CONSOLE
app.use(morgan('dev'));
//CONFIGURACION DE HTTPS

//MIDDLE TO FIND FOR ROUTE
app.use('/api/movies', movieRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

//MIDDLEWARE FOR UNKNOWN ROUTE
//404 Nt found handler
app.use('*', (req, res) => {
  return res.status(404).send('Error 404');
});

//MIDDLEWARE FOR HANDLING ERRORS
/**corregir para que reciba el status code */
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(500).send({ error: err });
});

const PORT = process.env.PORT || appConfig.port;
app.listen(PORT, () =>
  console.log(`server running on ${appConfig.host}:${PORT}`)
);
module.exports = app;
