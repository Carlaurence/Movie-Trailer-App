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
//console.log(path.join(__dirname, '../../'));
// app.use(
//   express.static(path.join(__dirname, '../../dist'), {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.css')) {
//         res.setHeader('Content-Type', 'text/css');
//       }
//     },
//   })
// );
//MIDDLEWARE TO SHOW HTTP RESQUEST IN CONSOLE
app.use(morgan('dev'));
//CONFIGURACION DE HTTPS
/**
 * const fs = require('fs');
// Cargar certificados
const privateKey = fs.readFileSync('path/to/private-key.pem', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.pem', 'utf8');
const ca = fs.readFileSync('path/to/ca.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };
 */
//MIDDLE TO FIND FOR ROUTE
//NOTA IMPORTANTE EN LA EJECUCION DEL GET: "/api/movies" ARROJA ERROR 500
// 1- IR A SUPERBASE Y REESTAURAR LA EJECUCION DEL SCHEMA "trailers"
// 2- HAY QUE INICIAR EL MOTOR DE BASE DE DATOS POSTREQL EN LA MAQUINA LOCAL
//EJECUTAR EL SIGUIENTE COMANDO EN CMD:
//psql postgresql://postgres.lixbmkkpmfkhchhwbfmw:cs201631216918827@aws-0-us-west-1.pooler.supabase.com:6543/postgres
//PASSWORD: Cs*xxxxx12
app.use('/api/movies', movieRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
//MIDDLEWARE FOR UNKNOWN ROUTE
app.use('*', (req, res) => res.status(404).send('Error 404'));
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
