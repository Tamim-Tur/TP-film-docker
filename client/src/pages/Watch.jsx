import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useRef, useEffect } from 'react';

const Watch = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);

    return (
        <div style={{ width: '100vw', height: '100vh', background: 'black', position: 'relative' }}>
            <div
                style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, cursor: 'pointer', color: 'white' }}
                onClick={() => navigate('/')}
            >
                <FaArrowLeft size={30} />
            </div>

            <video
                ref={videoRef}
                width="100%"
                height="100%"
                controls
                autoPlay
                crossOrigin="use-credentials"
            >
                <source src={`http://localhost:5050/api/movies/stream/${id}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Watch;
