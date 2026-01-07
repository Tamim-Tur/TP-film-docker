import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Watch from './pages/Watch';
import { useAuth } from './context/AuthContext';
import TVShows from './pages/TVShows';
import Movies from './pages/Movies';
import MyList from './pages/MyList';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tvshows"
        element={
          <ProtectedRoute>
            <TVShows />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watch/:id"
        element={
          <ProtectedRoute>
            <Watch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mylist"
        element={
          <ProtectedRoute>
            <MyList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
