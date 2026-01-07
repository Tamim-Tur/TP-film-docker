import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaPlay, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MyList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchList = async () => {
        try {
            const res = await axios.get('http://localhost:5050/api/movies/mylist', { withCredentials: true });
            setList(res.data.data.list);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const fillMyList = async () => {
        setLoading(true);
        try {
            // Get all movies
            const res = await axios.get('http://localhost:5050/api/movies', { withCredentials: true });
            const allMovies = res.data.data.movies;

            // Add first 5 movies to list
            for (let i = 0; i < Math.min(5, allMovies.length); i++) {
                try {
                    await axios.post('http://localhost:5050/api/movies/mylist', { movieId: allMovies[i]._id }, { withCredentials: true });
                } catch (e) {
                    // Ignore if already added
                }
            }
            fetchList();
            alert('Your list has been populated with some recommendations!');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (movieId) => {
        try {
            await axios.delete(`http://localhost:5050/api/movies/mylist/${movieId}`, { withCredentials: true });
            setList(list.filter(item => item.movieId !== movieId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#141414', color: 'white' }}>
            <Navbar />
            <div style={{ padding: '0 4%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>My List</h1>
                    <button
                        onClick={fillMyList}
                        disabled={loading}
                        style={{
                            background: '#e50914',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? 'Filling...' : 'Populate My List'}
                    </button>
                </div>

                {list.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <p style={{ color: '#b3b3b3', fontSize: '18px' }}>You haven't added any titles to your list yet.</p>
                        <button
                            onClick={() => navigate('/')}
                            style={{ background: 'white', color: 'black', border: 'none', padding: '10px 25px', borderRadius: '4px', marginTop: '20px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Browse Content
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '40px 10px'
                    }}>
                        {list.map(fav => (
                            <div key={fav.id} className="list-item" style={{ position: 'relative' }}>
                                <div
                                    style={{
                                        aspectRatio: '16/9',
                                        backgroundImage: `url(${fav.movieThumbnail})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s'
                                    }}
                                    className="fav-card"
                                    onClick={() => navigate(`/watch/${fav.movieId}`)}
                                >
                                    <div className="fav-overlay" style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0,0,0,0.6)',
                                        opacity: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '20px',
                                        transition: 'opacity 0.3s'
                                    }}>
                                        <FaPlay size={30} />
                                        <FaTrash
                                            size={25}
                                            color="#e50914"
                                            onClick={(e) => { e.stopPropagation(); removeFavorite(fav.movieId); }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px', fontWeight: 'bold' }}>{fav.movieTitle}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <style>
                {`
                    .fav-card:hover {
                        transform: scale(1.05);
                    }
                    .fav-card:hover .fav-overlay {
                        opacity: 1;
                    }
                `}
            </style>
        </div>
    );
};

export default MyList;
