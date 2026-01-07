const fs = require('fs');
const path = require('path');
const Movie = require('../models/Movie'); // Mongo Model

exports.getAllMovies = async (req, res) => {
    try {
        const queryObj = {};
        if (req.query.type) queryObj.type = req.query.type;
        if (req.query.genre) queryObj.genre = req.query.genre;

        const movies = await Movie.find(queryObj);
        res.status(200).json({
            status: 'success',
            results: movies.length,
            data: {
                movies
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // Mongo ID
        if (!movie) {
            return res.status(404).json({ status: 'fail', message: 'Movie not found' });
        }
        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        });
    } catch (err) {
        res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    }
};

exports.streamVideo = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        const videoPath = path.join(__dirname, '../../', movie.videoPath);

        if (!fs.existsSync(videoPath)) {
            return res.status(404).send('Video file not found on server');
        }

        const videoStat = fs.statSync(videoPath);
        const fileSize = videoStat.size;
        const videoRange = req.headers.range;

        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;

            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
