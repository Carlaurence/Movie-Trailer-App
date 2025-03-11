const express = require('express');
const movieControllers = require('../controllers/movieControllers');
const router = express.Router();
router.get('/', movieControllers.getAllMovies, (req, res) => { return res.status(200).json(res.locals.movies)});
router.post('/', movieControllers.createMovie, (req, res) => {return res.status(201).json({ msn: 'created!' })});
router.delete('/:id', movieControllers.deleteMovie, (req, res) => {return res.status(200).json({ msn: `Movie id: ${res.locals.movie} was deleted!` })});
module.exports = router;
