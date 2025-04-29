import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSignInAlt, FaUserPlus, FaCog, FaHistory, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartItems] = useState(3); // Sample cart items count
  const [user, setUser] = useState({
    name: '',
    email: ''
  });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in and get user data
    const token = localStorage.getItem('userToken');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (token && userName) {
      setIsLoggedIn(true);
      setUser({
        name: userName,
        email: userEmail || ''
      });
    }

    // Add event listener to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUser({ name: '', email: '' });
    setShowDropdown(false);
    navigate('/');
  };

  const toggleProfileDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const userMenuItems = [
    { label: 'My Profile', icon: <FaUser />, action: () => navigate('/profile') },
    { label: 'Orders', icon: <FaHistory />, action: () => navigate('/orders') },
    { label: 'Settings', icon: <FaCog />, action: () => navigate('/settings') },
    { label: 'Logout', icon: <FaSignOutAlt />, action: handleLogout }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/">
          <div className="brand-container">
            <span className="brand-name">SKIN CARE</span>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMobileMenu}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${showMobileMenu ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop" onClick={() => setShowMobileMenu(false)}>Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={() => setShowMobileMenu(false)}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={() => setShowMobileMenu(false)}>Contact</Link>
            </li>
          </ul>

          {/* Right Side Icons */}
          <div className="nav-icons">
            {/* User Account */}
            {isLoggedIn ? (
              <div className="nav-item dropdown" ref={dropdownRef}>
                <button 
                  className="nav-link dropdown-toggle d-flex align-items-center" 
                  onClick={toggleProfileDropdown}
                >
                  <div className="avatar avatar-sm me-2">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                      alt={user.name}
                      className="rounded-circle" 
                      width="32"
                      height="32"
                    />
                  </div>
                  <span className="d-none d-md-inline">{user.name}</span>
                </button>
                
                {showDropdown && (
                  <div className="dropdown-menu dropdown-menu-end show mt-2 py-2">
                    <div className="dropdown-header px-3 py-2">
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                            alt={user.name}
                            className="rounded-circle"
                            width="40"
                            height="40"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">{user.name}</h6>
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider my-1"></div>
                    {userMenuItems.map((item, index) => (
                      <button 
                        key={index}
                        className="dropdown-item d-flex align-items-center px-3 py-2"
                        onClick={() => {
                          item.action();
                          setShowMobileMenu(false);
                        }}
                      >
                        <span className="me-2">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setShowMobileMenu(false)}>
                  <FaSignInAlt className="me-1" /> Login
                </Link>
              </div>
            )}

            {/* Shopping Cart */}
            <Link to="/cart" className="cart-btn" onClick={() => setShowMobileMenu(false)}>
              <FaShoppingCart className="cart-icon" />
              {cartItems > 0 && (
                <span className="cart-badge">{cartItems}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;