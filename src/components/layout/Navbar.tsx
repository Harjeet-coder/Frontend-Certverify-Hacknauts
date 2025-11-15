import { useApp } from '@/providers/AppProvider';
import { GraduationCap, LogIn, UserPlus, User, Settings, LogOut, LayoutDashboard, FileCheck, BarChart3, UserCircle, Upload } from 'lucide-react';
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
          { icon: Upload, label: 'Upload', path: '/student/dashboard' },
          { icon: UserCircle, label: 'Portfolio', path: '/student/portfolio' },
        ];
      case 'faculty':
        return [
          { icon: FileCheck, label: 'Verify Certificates', path: '/faculty/verify' },
        ];
      case 'admin':
        return [
          { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      <NotificationBanner />
      <nav className="navbar">
        <div className="navbar-container">
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
                  <Link to="/login" className="navbar-profile-button" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                    <UserPlus style={{ width: '16px', height: '16px' }} />
                    Signup
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
                  {isProfileOpen && (
                    <div className="navbar-profile-dropdown">
                      <button onClick={() => setIsProfileOpen(false)}>
                        <User style={{ width: '16px', height: '16px' }} />
                        View Profile
                      </button>
                      <button onClick={() => setIsProfileOpen(false)}>
                        <Settings style={{ width: '16px', height: '16px' }} />
                        Edit Profile
                      </button>
                      <button onClick={() => { logout(); setIsProfileOpen(false); }}>
                        <LogOut style={{ width: '16px', height: '16px' }} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
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