import React, { useState } from 'react';
import { FaUser, FaShoppingCart, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import './header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartItems] = useState(3); // Sample cart items count

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
      <div className="container">
        {/* Brand Logo */}
        <a className="navbar-brand" href="/">
          <div className="brand-container">
           
            <span className="brand-name">PHONE STORE</span>
          </div>
        </a>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setShowDropdown(false)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shop">Shop</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
          </ul>

          {/* Right Side Icons */}
          <div className="nav-icons">
            {/* User Account */}
            <div className="user-dropdown">
              <button 
                className="user-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaUser className="user-icon" />
                <span className="user-text">{isLoggedIn ? 'My Account' : 'Login'}</span>
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu show">
                  {isLoggedIn ? (
                    <>
                      <a className="dropdown-item" href="/account">
                        <FaUser className="dropdown-icon" /> My Profile
                      </a>
                      <a className="dropdown-item" href="/orders">
                        <FaShoppingCart className="dropdown-icon" /> My Orders
                      </a>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FiLogOut className="dropdown-icon" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="dropdown-item" onClick={handleLogin}>
                        <FaSignInAlt className="dropdown-icon" /> Login
                      </button>
                      <a className="dropdown-item" href="/register">
                        <FaUserPlus className="dropdown-icon" /> Register
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart */}
            <a href="/cart" className="cart-btn">
              <FaShoppingCart className="cart-icon" />
              {cartItems > 0 && (
                <span className="cart-badge">{cartItems}</span>
              )}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;