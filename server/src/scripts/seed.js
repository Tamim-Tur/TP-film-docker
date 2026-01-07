const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const connectMongo = require('../config/dbMongo');

const movies = [
    {
        title: "Big Buck Bunny",
        description: "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
        thumbnail: "/images/thumbnails/big-buck-bunny.jpg",
        banner: "/images/banners/big-buck-bunny.jpg",
        duration: "10m",
        genre: ["Animation", "Comedy", "Popular"],
        releaseDate: "2008",
        rating: "TV-G",
        cast: ["Bunny", "Squirrels"],
        videoPath: "assets/sample.mp4",
        type: "movie"
    },
    {
        title: "Cosmos Laundromat",
        description: "On a desolate island, a suicidal sheep named Franck meets his fate in a quirky salesman, who offers him the gift of a lifetime.",
        thumbnail: "/images/thumbnails/cosmos-laundromat.jpg",
        banner: "/images/banners/cosmos-laundromat.jpg",
        duration: "12m",
        genre: ["Sci-Fi", "Drama", "Popular"],
        releaseDate: "2015",
        rating: "TV-14",
        cast: ["Franck", "Victor"],
        videoPath: "assets/sample2.mp4",
        type: "movie"
    },
    {
        title: "Sintel",
        description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she names Scales.",
        thumbnail: "/images/thumbnails/sintel.jpg",
        banner: "/images/banners/sintel.jpg",
        duration: "15m",
        genre: ["Fantasy", "Action", "Drama"],
        releaseDate: "2010",
        rating: "TV-PG",
        cast: ["Sintel", "Scales"],
        videoPath: "assets/sample3.mp4",
        type: "movie"
    },
    {
        title: "Tears of Steel",
        description: "In a future where humanity is at war with robots, a group of scientists tries to rewrite history.",
        thumbnail: "/images/thumbnails/tears-of-steel.jpg",
        banner: "/images/banners/tears-of-steel.jpg",
        duration: "12m",
        genre: ["Sci-Fi", "Action", "Thriller"],
        releaseDate: "2012",
        rating: "TV-MA",
        cast: ["Celia", "Thom"],
        videoPath: "assets/sample4.mp4",
        type: "movie"
    },
    {
        title: "The Daily Dweebs",
        description: "The misadventures of a dog named Dixy and his friends in 1950s suburbia.",
        thumbnail: "/images/thumbnails/the-daily-dweebs.jpg",
        banner: "/images/banners/the-daily-dweebs.jpg",
        duration: "5m",
        genre: ["Animation", "Comedy"],
        releaseDate: "2016",
        rating: "TV-Y7",
        cast: ["Dixy"],
        videoPath: "assets/sample5.mp4",
        type: "tvshow"
    },
    {
        title: "Agent 327",
        description: "Agent 327 is an elite investigator, Dutch style.",
        thumbnail: "/images/thumbnails/agent-327.jpg",
        banner: "/images/banners/agent-327.jpg",
        duration: "4m",
        genre: ["Animation", "Action", "Comedy"],
        releaseDate: "2017",
        rating: "TV-PG",
        cast: ["Agent 327", "Boris"],
        videoPath: "assets/sample6.mp4",
        type: "tvshow"
    },
    {
        title: "Elephants Dream",
        description: "Two strange characters explore a giant, mystical machine.",
        thumbnail: "/images/thumbnails/elephants-dream.jpg",
        banner: "/images/banners/elephants-dream.jpg",
        duration: "11m",
        genre: ["Fantasy", "Short", "Sci-Fi"],
        releaseDate: "2006",
        rating: "TV-G",
        cast: ["Proog", "Emo"],
        videoPath: "assets/sample.mp4",
        type: "movie"
    },
    {
        title: "Caminandes: Gran Dillama",
        description: "A llama named Koro travels across the desolate plains of Patagonia.",
        thumbnail: "/images/thumbnails/caminandes.jpg",
        banner: "/images/banners/caminandes.jpg",
        duration: "3m",
        genre: ["Animation", "Comedy", "Short"],
        releaseDate: "2013",
        rating: "TV-Y",
        cast: ["Koro"],
        videoPath: "assets/sample2.mp4",
        type: "tvshow"
    },
    {
        title: "Heroic Quest",
        description: "A placeholder for another exciting adventure.",
        thumbnail: "/images/thumbnails/heroic-quest.jpg",
        banner: "/images/banners/heroic-quest.jpg",
        duration: "1h 20m",
        genre: ["Action", "Fantasy", "New"],
        releaseDate: "2024",
        rating: "TV-14",
        cast: ["Hero"],
        videoPath: "assets/sample3.mp4",
        type: "movie"
    },
    {
        title: "Mystery of the Void",
        description: "A deep space exploration that goes horribly wrong.",
        thumbnail: "/images/thumbnails/mystery-of-the-void.jpg",
        banner: "/images/banners/mystery-of-the-void.jpg",
        duration: "1h 45m",
        genre: ["Sci-Fi", "Thriller", "Horror"],
        releaseDate: "2023",
        rating: "TV-MA",
        cast: ["Astronaut"],
        videoPath: "assets/sample4.mp4",
        type: "movie"
    },
    {
        title: "The Social Dilemma Part II",
        description: "A documentary series exploring the impact of social media.",
        thumbnail: "/images/thumbnails/the-social-dilemma.jpg",
        banner: "/images/banners/the-social-dilemma.jpg",
        duration: "45m",
        genre: ["Documentary", "Tech"],
        releaseDate: "2025",
        rating: "TV-PG",
        cast: ["Tristan Harris"],
        videoPath: "assets/sample5.mp4",
        type: "tvshow"
    },
    {
        title: "Stellar Journey",
        description: "Episodes following a crew on a mission to Alpha Centauri.",
        thumbnail: "/images/thumbnails/stellar-journey.jpg",
        banner: "/images/banners/stellar-journey.jpg",
        duration: "50m",
        genre: ["Sci-Fi", "Adventure"],
        releaseDate: "2024",
        rating: "TV-14",
        cast: ["Space Crew"],
        videoPath: "assets/sample6.mp4",
        type: "tvshow"
    }
];

const seedDB = async () => {
    try {
        await connectMongo();
        await Movie.deleteMany({});
        await Movie.insertMany(movies);
        console.log('Movies seeded successfully with LOCAL image paths!');
    } catch (err) {
        console.error('Error seeding movies:', err);
    } finally {
        mongoose.disconnect();
        process.exit();
    }
};

seedDB();
