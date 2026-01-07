import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(username, email, password);
            navigate('/');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg)' }}>
            <div className="glass" style={{ width: '100%', maxWidth: '450px', padding: '60px 68px 40px', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.75)' }}>
                <h1 style={{ marginBottom: '28px', fontSize: '32px', fontWeight: '700' }}>Sign Up</h1>
                {error && <div style={{ color: '#e87c03', marginBottom: '15px' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }}>Sign Up</button>
                    <div style={{ marginTop: '16px', color: '#b3b3b3' }}>
                        Already have an account? <Link to="/login" style={{ color: 'white' }}>Sign in now.</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
