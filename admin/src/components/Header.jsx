import React, { useState } from 'react';
import { RiMenuFill, RiSearchLine, RiUserLine, RiSettingsLine, RiLogoutCircleLine, RiNotificationLine, RiMailLine } from 'react-icons/ri';

function Header({ onMenuToggle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New order received', time: '2 hours ago', read: false },
    { id: 2, text: 'Server down', time: '5 hours ago', read: true },
  ]);

  const userMenuItems = [
    { icon: <RiUserLine />, label: 'Profile', action: () => handleMenuItemClick('profile') },
    { icon: <RiSettingsLine />, label: 'Settings', action: () => handleMenuItemClick('settings') },
    { icon: <RiLogoutCircleLine />, label: 'Logout', action: () => handleMenuItemClick('logout') },
  ];

  const handleMenuItemClick = (action) => {
    setIsProfileDropdownOpen(false);
    console.log(`Action: ${action}`);
    // Add your action handlers here
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add search functionality here
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="layout-page">
    <header className="layout-navbar navbar navbar-expand-xl navbar-detached align-items-center sticky-top ">
      <div className="container-fluid">
        {/* Mobile menu toggle */}
        <button 
          className="navbar-toggler border-0 px-3 d-xl-none" 
          type="button"
          onClick={onMenuToggle}
        >
          <RiMenuFill size={24} />
        </button>

        {/* Search bar */}
        <div className="navbar-nav align-items-center flex-grow-1">
          <form className="w-100" onSubmit={handleSearch}>
            <div className="input-group input-group-merge">
              <span className="input-group-text bg-transparent border-0">
                <RiSearchLine size={20} />
              </span>
              <input
                type="text"
                className="form-control border-0 shadow-none bg-transparent"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Right side icons */}
        <div className="navbar-nav align-items-center ms-auto">
          {/* Notifications */}
          <div className="nav-item dropdown mx-2">
            <button 
              className="nav-link dropdown-toggle hide-arrow position-relative" 
              onClick={() => setIsProfileDropdownOpen(false)}
            >
              <RiNotificationLine size={20} />
              {notifications.some(n => !n.read) && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            <div className="dropdown-menu dropdown-menu-end py-0 mt-2" style={{ width: '300px' }}>
              <div className="dropdown-header border-bottom">
                <h6 className="m-0">Notifications</h6>
                <span className="text-muted small">{notifications.length} New</span>
              </div>
              <div className="notification-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`dropdown-item d-flex py-3 border-bottom ${!notification.read ? 'bg-light' : ''}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex-grow-1">
                      <p className="mb-1">{notification.text}</p>
                      <small className="text-muted">{notification.time}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer text-center py-2">
                <a href="#" className="text-primary">View all notifications</a>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="nav-item dropdown mx-2">
            <button className="nav-link dropdown-toggle hide-arrow">
              <RiMailLine size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
          </div>

          {/* User profile */}
          <div className="nav-item dropdown">
            <button 
              className="nav-link dropdown-toggle d-flex align-items-center" 
              onClick={toggleProfileDropdown}
            >
              <div className="avatar avatar-sm me-2">
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg" 
                  alt="User" 
                  className="rounded-circle" 
                  width="32"
                  height="32"
                />
              </div>
              <span className="d-none d-md-inline">John Doe</span>
            </button>
            
            {isProfileDropdownOpen && (
              <div className="dropdown-menu dropdown-menu-end show mt-2 py-2">
                <div className="dropdown-header px-3 py-2">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-3">
                      <img 
                        src="https://randomuser.me/api/portraits/men/1.jpg" 
                        alt="User" 
                        className="rounded-circle"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div>
                      <h6 className="mb-0">John Doe</h6>
                      <small className="text-muted">Admin</small>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider my-1"></div>
                {userMenuItems.map((item, index) => (
                  <button 
                    key={index}
                    className="dropdown-item d-flex align-items-center px-3 py-2"
                    onClick={item.action}
                  >
                    <span className="me-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    </div>
  );
}

export default Header;