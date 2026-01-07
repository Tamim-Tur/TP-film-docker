const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    thumbnail: String,
    banner: String,
    duration: String,
    genre: [String],
    releaseDate: String,
    rating: String,
    cast: [String],
    videoPath: String,
    type: {
        type: String,
        enum: ['movie', 'tvshow'],
        default: 'movie'
    }
});

module.exports = mongoose.model('Movie', movieSchema);
