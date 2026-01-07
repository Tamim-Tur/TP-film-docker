const express = require('express');
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all movie routes
const contentController = require('../controllers/contentController');

router.use(authMiddleware.protect);

router.get('/', movieController.getAllMovies);
router.get('/search', contentController.searchMovies);
router.get('/mylist', contentController.getMyList);
router.post('/mylist', contentController.addToMyList);
router.delete('/mylist/:movieId', contentController.removeFromMyList);
router.get('/:id', movieController.getMovie);
router.get('/stream/:id', movieController.streamVideo);

module.exports = router;
