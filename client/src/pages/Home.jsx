import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

const Home = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    return (
        <div style={{ paddingBottom: '50px' }}>
            <Navbar />
            {!searchQuery && <Hero />}
            <div style={{
                marginTop: searchQuery ? '100px' : '-150px',
                position: 'relative',
                zIndex: 10,
                padding: searchQuery ? '0 4%' : '0'
            }}>
                {searchQuery ? (
                    <MovieRow title={`Results for "${searchQuery}"`} searchQuery={searchQuery} />
                ) : (
                    <>
                        <MovieRow title="Popular on Netflix" genre="Popular" />
                        <MovieRow title="Trendings" genre="Action" />
                        <MovieRow title="Sci-Fi & Fantasy" genre="Sci-Fi" />
                        <MovieRow title="Animation" genre="Animation" />
                        <MovieRow title="New Releases" />
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
