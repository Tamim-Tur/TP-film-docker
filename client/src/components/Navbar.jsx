import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { logout } = useAuth();
    const navigate = useNavigate();

    const notifications = [
        { id: 1, text: "New Movie: Agent 327 is now available!", time: "2h ago" },
        { id: 2, text: "Your subscription was successfully renewed.", time: "1d ago" },
        { id: 3, text: "Welcome to Netflix Clone! Start browsing movies.", time: "2d ago" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) setIsScrolled(true);
            else setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/?search=${searchQuery}`);
        }
    };

    return (
        <nav style={{
            height: '70px',
            width: '100%',
            position: 'fixed',
            top: 0,
            zIndex: 1000,
            background: isScrolled ? '#141414' : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0))',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 4%',
            color: 'white'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <h2 style={{ color: '#e50914', cursor: 'pointer', fontSize: '25px', margin: 0 }} onClick={() => navigate('/')}>NETFLIX</h2>
                <span className="nav-link" style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => navigate('/')}>Home</span>
                <span className="nav-link" style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => navigate('/tvshows')}>TV Shows</span>
                <span className="nav-link" style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => navigate('/movies')}>Movies</span>
                <span className="nav-link" style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => navigate('/mylist')}>My List</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: isSearchOpen ? 'rgba(0,0,0,0.75)' : 'transparent',
                    border: isSearchOpen ? '1px solid white' : 'none',
                    padding: '5px 10px',
                    transition: 'all 0.3s'
                }}>
                    <FaSearch
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    />
                    {isSearchOpen && (
                        <input
                            autoFocus
                            type="text"
                            placeholder="Titles, people, genres"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                marginLeft: '10px',
                                outline: 'none',
                                width: '200px',
                                fontSize: '14px'
                            }}
                        />
                    )}
                </div>

                <div style={{ position: 'relative' }}>
                    <FaBell
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowNotifications(!showNotifications)}
                    />
                    {showNotifications && (
                        <div style={{
                            position: 'absolute',
                            top: '35px',
                            right: '0',
                            background: 'rgba(0,0,0,0.95)',
                            border: '1px solid #333',
                            width: '300px',
                            borderRadius: '2px',
                            padding: '10px',
                            boxShadow: '0 0 20px rgba(0,0,0,0.8)'
                        }}>
                            <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #333', paddingBottom: '5px', fontSize: '14px' }}>Notifications</h4>
                            {notifications.map(n => (
                                <div key={n.id} style={{ padding: '10px 0', borderBottom: '1px solid #222', fontSize: '13px' }}>
                                    <div>{n.text}</div>
                                    <div style={{ fontSize: '11px', color: '#757575', marginTop: '3px' }}>{n.time}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div onClick={() => navigate('/profile')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
                    <FaUser />
                </div>

                <div onClick={handleLogout} style={{ cursor: 'pointer', fontSize: '14px', border: '1px solid #333', padding: '2px 8px', borderRadius: '3px' }}>
                    Logout
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
