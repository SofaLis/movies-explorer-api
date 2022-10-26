const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationMovie, validationMovieId } = require('../utils/validation');

router.get('/', getMovies);

router.post('/', validationMovie, createMovie);

router.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = router;
