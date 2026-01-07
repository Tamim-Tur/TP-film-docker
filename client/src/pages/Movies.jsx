import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

const Movies = () => {
    return (
        <div style={{ paddingBottom: '50px', background: '#141414', minHeight: '100vh' }}>
            <Navbar />
            <Hero type="movie" />
            <div style={{ marginTop: '-150px', position: 'relative', zIndex: 10 }}>
                <MovieRow title="Epic Movies" type="movie" />
                <MovieRow title="Action Movies" genre="Action" type="movie" />
                <MovieRow title="Sci-Fi & Fantasy" genre="Sci-Fi" type="movie" />
                <MovieRow title="Popular Movies" genre="Popular" type="movie" />
            </div>
        </div>
    );
};

export default Movies;
