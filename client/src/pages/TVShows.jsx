import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

const TVShows = () => {
    return (
        <div style={{ paddingBottom: '50px', background: '#141414', minHeight: '100vh' }}>
            <Navbar />
            <Hero type="tvshow" />
            <div style={{ marginTop: '-150px', position: 'relative', zIndex: 10 }}>
                <MovieRow title="Binge-worthy TV Shows" type="tvshow" />
                <MovieRow title="Docuseries" genre="Documentary" type="tvshow" />
                <MovieRow title="Animation Series" genre="Animation" type="tvshow" />
                <MovieRow title="Sci-Fi Series" genre="Sci-Fi" type="tvshow" />
            </div>
        </div>
    );
};

export default TVShows;
