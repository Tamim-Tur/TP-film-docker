import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieRow = ({ title, genre, searchQuery, type }) => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let url = 'http://localhost:5050/api/movies';

                if (searchQuery) {
                    url = `http://localhost:5050/api/movies/search?q=${searchQuery}`;
                } else {
                    const params = new URLSearchParams();
                    if (genre) params.append('genre', genre);
                    if (type) params.append('type', type);
                    if (params.toString()) url += `?${params.toString()}`;
                }

                const res = await axios.get(url, { withCredentials: true });
                let data = res.data.data.movies;

                // Backend find() might not work perfectly with array-in-array genre search if not handled
                // So adding a small safety filter if needed, but Mongoose usually handles genre: 'Sci-Fi' on [String]

                setMovies(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovies();
    }, [genre, searchQuery, type]);

    if (movies.length === 0) return null;

    return (
        <div style={{ marginBottom: '30px', paddingLeft: '4%', animation: 'fadeIn 0.5s ease-in' }}>
            <h2 style={{ marginBottom: '10px', fontSize: '20px', fontWeight: '500' }}>{title}</h2>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'scroll', paddingBottom: '20px' }} className="row-scroll">
                {movies.map(movie => (
                    <div
                        key={movie._id}
                        style={{
                            minWidth: '240px',
                            height: '135px',
                            backgroundImage: `url(${movie.thumbnail})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                        }}
                        className="movie-card"
                        onClick={() => navigate(`/watch/${movie._id}`)}
                    >
                        <div className="hover-info" style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            background: 'rgba(20,20,20,0.95)', padding: '15px',
                            opacity: 0, transition: 'opacity 0.3s',
                            borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px',
                            boxShadow: '0 -20px 40px rgba(0,0,0,0.5)'
                        }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>{movie.title}</div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button
                                    className="play-btn-circle"
                                    onClick={(e) => { e.stopPropagation(); navigate(`/watch/${movie._id}`); }}
                                    style={{
                                        background: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px'
                                    }}
                                >▶</button>
                                <button
                                    className="add-btn-circle"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        try {
                                            await axios.post('http://localhost:5050/api/movies/mylist', { movieId: movie._id }, { withCredentials: true });
                                            alert('Added to My List!');
                                        } catch (err) { alert('Already in list or error'); }
                                    }}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.5)',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        fontSize: '16px'
                                    }}
                                >+</button>
                                <span style={{ fontSize: '12px', color: '#46d369', fontWeight: 'bold', marginLeft: 'auto' }}>{movie.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style>
                {`
                    .movie-card:hover {
                        transform: scale(1.4);
                        z-index: 100;
                        box-shadow: 0 0 20px rgba(0,0,0,0.8);
                    }
                    .movie-card:hover .hover-info {
                        opacity: 1;
                    }
                    .row-scroll::-webkit-scrollbar {
                        display: none;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .play-btn-circle:hover { background: #e6e6e6 !important; transform: scale(1.1); }
                    .add-btn-circle:hover { border-color: white !important; background: rgba(255,255,255,0.2) !important; transform: scale(1.1); }
                `}
            </style>
        </div>
    );
};

export default MovieRow;
