import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5050/api/auth/login', { email, password }, { withCredentials: true });
            setUser(res.data.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.data.user));
            // Token is handled by cookie automatically for subsequent requests
            // But we need to set the Authorization header if we weren't using cookies exclusively or for the first request?
            // Actually, my backend checks header OR cookie.
            // Let's set default header to be safe if we were using it, but for now cookie is enough.
            return true;
        } catch (error) {
            console.error(error);
            throw error.response?.data?.message || 'Login failed';
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await axios.post('http://localhost:5050/api/auth/register', { username, email, password }, { withCredentials: true });
            setUser(res.data.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.data.user));
            return true;
        } catch (error) {
            console.error(error);
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    const logout = async () => {
        try {
            await axios.get('http://localhost:5050/api/auth/logout', { withCredentials: true });
            setUser(null);
            localStorage.removeItem('user');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
