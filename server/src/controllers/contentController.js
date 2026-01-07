const Favorite = require('../models/Favorite');
const Movie = require('../models/Movie');

exports.addToMyList = async (req, res) => {
    try {
        const { movieId } = req.body;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ status: 'fail', message: 'Movie not found' });
        }

        // Check if already in list
        const existing = await Favorite.findOne({
            where: { UserId: req.user.id, movieId }
        });

        if (existing) {
            return res.status(400).json({ status: 'fail', message: 'Already in list' });
        }

        const fav = await Favorite.create({
            UserId: req.user.id,
            movieId: movie._id.toString(),
            movieTitle: movie.title,
            movieThumbnail: movie.thumbnail
        });

        res.status(201).json({ status: 'success', data: fav });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getMyList = async (req, res) => {
    try {
        const list = await Favorite.findAll({ where: { UserId: req.user.id } });
        res.status(200).json({ status: 'success', data: { list } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.removeFromMyList = async (req, res) => {
    try {
        await Favorite.destroy({
            where: { UserId: req.user.id, movieId: req.params.movieId }
        });
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.searchMovies = async (req, res) => {
    try {
        const { q } = req.query;
        // Search in title or genre
        const movies = await Movie.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { genre: { $regex: q, $options: 'i' } }
            ]
        });
        res.status(200).json({ status: 'success', data: { movies } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
