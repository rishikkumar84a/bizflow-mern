import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">BizFlow</Link>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link>
          <Link to="/leads/pipeline" className="hover:bg-blue-700 px-3 py-2 rounded">Pipeline</Link>
          {(user.role === 'admin' || user.role === 'manager') && (
            <Link to="/analytics" className="hover:bg-blue-700 px-3 py-2 rounded">Analytics</Link>
          )}
          <div className="flex items-center gap-4">
            <span>{user.name} ({user.role})</span>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
