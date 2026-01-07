import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';

const Hero = ({ type }) => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                let url = 'http://localhost:5050/api/movies';
                if (type) {
                    url += `?type=${type}`;
                }
                const res = await axios.get(url, { withCredentials: true });
                const movies = res.data.data.movies;
                if (movies.length > 0) {
                    // Get a random content for the hero
                    const random = movies[Math.floor(Math.random() * movies.length)];
                    setMovie(random);
                }
            } catch (err) {
                console.error('Failed to fetch hero content', err);
            }
        };
        fetchHero();
    }, [type]);

    if (!movie) return <div style={{ height: '80vh', background: '#141414' }}></div>;

    return (
        <div style={{
            height: '80vh',
            width: '100%',
            backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(20,20,20,1)), url(${movie.banner || movie.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '4%',
            animation: 'fadeIn 1s ease-in'
        }}>
            <div style={{ maxWidth: '40%' }}>
                <h1 style={{ fontSize: '60px', marginBottom: '20px', fontWeight: 'bold' }}>{movie.title}</h1>
                <p style={{ fontSize: '20px', marginBottom: '25px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', color: '#e5e5e5', lineHeight: '1.4' }}>
                    {movie.description}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className="btn"
                        style={{
                            background: 'white',
                            color: 'black',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 35px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/watch/${movie._id}`)}
                    >
                        <FaPlay /> Play
                    </button>
                    <button
                        className="btn"
                        style={{
                            background: 'rgba(109, 109, 110, 0.7)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 35px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        <FaInfoCircle /> More Info
                    </button>
                </div>
            </div>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .btn:hover {
                        opacity: 0.8;
                        transform: scale(1.02);
                    }
                `}
            </style>
        </div>
    );
};

export default Hero;
