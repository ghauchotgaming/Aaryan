import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
            <path d="M24 4C24 4 8 20 8 30C8 38.837 15.163 44 24 44C32.837 44 40 38.837 40 30C40 20 24 4 24 4Z" fill="url(#loadDrop)" opacity="0.6"/>
            <defs>
              <linearGradient id="loadDrop" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8"/>
                <stop offset="1" stopColor="#0369a1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p>Loading H2O-Flow...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
