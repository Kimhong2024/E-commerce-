import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar_menu() {
  const handleClick = (e) => {
    e.preventDefault();
    // Add sidebar toggle logic if needed
  };

  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme shadow-sm">
      <div className="app-brand demo">
        <NavLink to="/" className="app-brand-link">
          <span className="app-brand-logo demo me-1">
            <span style={{ color: 'var(--bs-primary)' }}>
              {/* Your SVG logo */}
            </span>
          </span>
          <span className="app-brand-text demo menu-text fw-semibold ms-2">Your Logo</span>
        </NavLink>
        <a href="#" className="layout-menu-toggle menu-link text-large ms-auto" onClick={handleClick}>
          <i className="menu-toggle-icon d-xl-block align-middle" />
        </a>
      </div>

      <div className="menu-inner-shadow" />
      <ul className="menu-inner py-1">
        {/* Dashboard */}
        <li className="menu-item">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <i className="menu-icon tf-icons ri-dashboard-line" />
            <div data-i18n="Dashboard">Dashboard</div>
          </NavLink>
        </li>

        {/* Product */}
        <li className="menu-item">
          <NavLink
            to="/product"
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <i className="menu-icon tf-icons ri-shopping-bag-line" />
            <div data-i18n="Product">Product</div>
          </NavLink>
        </li>
        {/* Category */}
        <li className="menu-item">
          <NavLink
            to="/Category"
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <i className="menu-icon tf-icons ri-file-chart-line" />
            <div data-i18n="Category">Category</div>
          </NavLink>
        </li>

        {/* Order */}
        <li className="menu-item">
          <NavLink
            to="/order"
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <i className="menu-icon tf-icons ri-shopping-cart-2-line" />
            <div data-i18n="Order">Order</div>
          </NavLink>
        </li>

        {/* Customer */}
        <li className="menu-item">
          <NavLink
            to="/customer"
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <i className="menu-icon tf-icons ri-user-line" />
            <div data-i18n="Customer">Customer</div>
          </NavLink>
        </li>

        

        {/* Invoices */}
        <li className="menu-item">
          <NavLink
            to="/invoices"
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <i className="menu-icon tf-icons ri-file-text-line" />
            <div data-i18n="Invoices">Invoices</div>
          </NavLink>
        </li>

        {/* Settings */}
        <li className="menu-item">
          <NavLink
            to="/settings"
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <i className="menu-icon tf-icons ri-settings-line" />
            <div data-i18n="Settings">Settings</div>
          </NavLink>
        </li>

        {/* Optional Section - divider */}
        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Optional</span>
        </li>
        
        {/* Optional Menu Item */}
        <li className="menu-item">
          <NavLink
            to="/HeroSection"
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <i className="menu-icon tf-icons ri-star-line" />
            <div data-i18n="HeroSection">HeroSection</div>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar_menu;