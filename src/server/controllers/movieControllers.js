const db = require('../models/movieTrailersModels');
const movieControllers = {};
movieControllers.getAllMovies = (req, res, next) => {
  const queryString = 'SELECT * FROM Movie';
  db.query(queryString)
    .then((data) => {
      res.locals.movies = data.rows;
      //   console.log(data.rows)
      next();
    })
    .catch((err) => {
      const baseError = {
        message: 'An error occurred',
        status: `${err}`,
      };
      return next({ error: err, ...baseError });
    });
};
movieControllers.createMovie = (req, res, next) => {
  //Distructuring object received from client-side
  const {
    title,
    release_date,
    backdrop_path,
    poster_path,
    overview,
    video,
    language_id,
    country_id,
  } = req.body;

  const queryString =
    'INSERT INTO Movie (title, release_date, backdrop_path, poster_path, overview, video, language_id, country_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  const params = [
    title,
    release_date,
    backdrop_path,
    poster_path,
    overview,
    video,
    language_id,
    country_id,
  ];
  db.query(queryString, params)
    .then((data) => {
      if (data.rowCount === 1) {
        // Inserción exitosa
        console.log(data.rowCount);
        next();
      } else {
        // Manejar caso de error (inserción fallida)
        const error = new Error('An error occurred');
        return next({ error });
      }
    })
    .catch((err) => {
      const baseError = {
        message: 'An error occurred',
        status: `${err}`,
      };
      return next({ error: err, ...baseError });
    });
};

movieControllers.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const queryString = ' DELETE FROM Movie WHERE _id=$1';
  const params = [id];
  db.query(queryString, params)
    .then((data) => {
      if (data.rowCount === 1) {
        res.locals.movie = id;
      } else {
        // Manejar caso de error (elemento no encontrado)
        const error = new Error(`Movie by id: ${id} not found`);
        return next({ error });
      }
    })
    .catch((err) => {
      const baseError = {
        message: 'An error occurred',
        status: `${err}`,
      };
      return next({ error: err, ...baseError });
    });
};
/**
 * db.query(getAllMovies, (err, data) => {
    if (err) return next({ error: err, ...baseError });
    res.locals.movies = data.rows;
    console.log(res.locals.movies);
    next();
  });
};
 */
// starWarsController.getCharacters = (req, res, next) => {
//     const getPeopleQuery ='SELECT p.*, s.name AS species, pl.name AS homeworld, f.title AS film FROM people p LEFT OUTER JOIN species s ON p.species_id = s._id LEFT OUTER JOIN planets pl ON p.homeworld_id = pl._id LEFT OUTER JOIN people_in_films pif ON p._id = pif.person_id LEFT OUTER JOIN films f ON pif.film_id = f._id ORDER BY p._id ASC';
//     db.query(getPeopleQuery, (err, result)=> {
//       if(err) return next({'error': err, ...baseError});
//       const groupPeopleByPersonId = result.rows.reduce((acc, person)=>{
//         const { _id, name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height, species, homeworld, film } = person;
//         const existingPerson = acc.find(p => p._id === _id);
//         if(existingPerson) existingPerson.films.push({title:film});
//         else acc.push({ _id, name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height, species, homeworld, films: [{title:film}] });
//         return acc;
//       }, []);//acc initialize as an empty array
//       res.locals.people = groupPeopleByPersonId;
//       next();
//     })
//   };
module.exports = movieControllers;
