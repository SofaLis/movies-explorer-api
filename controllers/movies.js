const Movie = require('../models/movie');

const BadRequest = require('../utils/err/BadRequest');
const NotFound = require('../utils/err/NotFound');
const Forbidden = require('../utils/err/Forbidden');

const {
  NFCard, BR, Forb, FilmDelete,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(BR));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound(NFCard);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new Forbidden(Forb);
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.status(200).send(FilmDelete))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(BR));
      } else {
        next(err);
      }
    });
};
