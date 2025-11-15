import { useApp } from '@/providers/AppProvider';
import { GraduationCap, LogIn, User, LogOut, LayoutDashboard, FileCheck, BarChart3, UserCircle, Upload, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NotificationBanner } from '@/components/shared/NotificationBanner';
import { useState } from 'react';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useApp();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getNavItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
          { icon: UserCircle, label: 'Portfolio', path: '/student/portfolio' },
        ];

      case 'faculty':
        return [
          { icon: FileCheck, label: 'Verify Certificates', path: '/faculty/verify' },
        ];

      case 'admin':
        return [
          { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
          { icon: UserPlus, label: 'Add User', path: '/admin/add-user' },
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      <NotificationBanner 
        message="" 
        visible={false} 
        onClose={() => {}} 
      />

      <nav className="navbar">
        <div className="navbar-container">

          {/* ------------------- HEADER ------------------- */}
          <div className="navbar-header">
            <Link to="/" className="navbar-logo">
              <GraduationCap className="navbar-logo-icon" />
              <span>EduVault</span>
            </Link>

            <div className="navbar-actions">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="navbar-profile-button">
                    <LogIn style={{ width: '16px', height: '16px' }} />
                    Login
                  </Link>
                </>
              ) : (
                <div className="navbar-profile">
                  <button 
                    className="navbar-profile-button"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <div className="navbar-profile-avatar">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user?.name}</span>
                  </button>

                  {/* -------------- DROPDOWN ---------------- */}
                  {isProfileOpen && (
                    <div className="navbar-profile-dropdown">

                      {/* ⭐ VIEW PROFILE */}
                      <Link 
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User style={{ width: '16px', height: '16px' }} />
                        View Profile
                      </Link>

                      {/* ⭐ LOGOUT */}
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                          window.location.href = "/"; // redirect after logout
                        }}
                        className="dropdown-item"
                      >
                        <LogOut style={{ width: '16px', height: '16px' }} />
                        Logout
                      </button>

                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ------------------- NAVIGATION LINKS ------------------- */}
          {isAuthenticated && navItems.length > 0 && (
            <div className="navbar-nav">
              <div className="navbar-nav-container">
                <ul className="navbar-nav-list">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <li key={item.path} className="navbar-nav-item">
                        <Link 
                          to={item.path}
                          className={isActive ? 'active' : ''}
                        >
                          <Icon style={{ width: '20px', height: '20px' }} />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

        </div>
      </nav>
    </>
  );
};
