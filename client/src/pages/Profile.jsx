import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#141414' }}>
            <Navbar />
            <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>Account</h1>
                <div style={{ display: 'flex', gap: '40px' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ color: '#757575', textTransform: 'uppercase', fontSize: '18px', marginBottom: '20px' }}>Membership & Billing</h3>
                        <div style={{ color: 'white', fontWeight: 'bold' }}>{user.email}</div>
                        <div style={{ color: '#b3b3b3', marginTop: '5px' }}>Password: ********</div>
                    </div>
                </div>
                <div style={{ marginTop: '40px', borderTop: '1px solid #333', paddingTop: '20px' }}>
                    <h3 style={{ color: '#757575', textTransform: 'uppercase', fontSize: '18px', marginBottom: '20px' }}>Profile Details</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <FaUserCircle size={60} color="#333" />
                        <div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{user.username}</div>
                            <div style={{ color: '#b3b3b3' }}>Netflix Member since 2026</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
