import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiLock, FiShoppingBag, FiHeart, FiSettings, FiPackage, FiCalendar, FiDollarSign } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [currentToken, setCurrentToken] = useState(localStorage.getItem('token'));

  // Listen for storage changes (like when token is removed during logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      if (newToken !== currentToken) {
        setCurrentToken(newToken);
        if (!newToken) {
          // Clear all states when user logs out
          setUser({
            name: '',
            email: '',
            phone: '',
            address: '',
          });
          setOrders([]);
          setError(null);
          navigate('/login');
        } else {
          // Fetch fresh data when new user logs in
          fetchCustomerProfile();
          if (activeTab === 'orders') {
            fetchCustomerOrders();
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentToken, activeTab, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to view your profile');
      toast.error('Please login to view your profile');
      navigate('/login');
      return;
    }
    fetchCustomerProfile();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchCustomerOrders();
    }
  }, [activeTab]);

  const fetchCustomerOrders = async () => {
    try {
      setOrdersLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your orders');
        toast.error('Please login to view your orders');
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/customer/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.data) {
        setOrders(response.data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      if (err.response && err.response.status === 401) {
        setError('Your session has expired. Please login again.');
        toast.error('Your session has expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error('Failed to load orders');
      }
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchCustomerProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your profile');
        toast.error('Please login to view your profile');
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/customer/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.data && response.data.data.customer) {
        const customerData = response.data.data.customer;
        setUser({
          name: customerData.name || '',
          email: customerData.email || '',
          phone: customerData.phone || '',
          address: customerData.address || '',
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      if (err.response && err.response.status === 401) {
        setError('Your session has expired. Please login again.');
        toast.error('Your session has expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Failed to load profile');
        toast.error('Failed to load profile information');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to update your profile');
        navigate('/login');
        return;
      }

      const response = await axios.put('http://localhost:8000/api/customer/profile', user, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        fetchCustomerProfile(); // Refresh the profile data
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      if (err.response && err.response.status === 401) {
        toast.error('Your session has expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error('Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user.name) {
    return (
      <div className="profile-page">
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="container py-5">
          <div className="alert alert-danger text-center">
            {error}
            <div className="mt-3">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container py-5">
        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-lg-3">
            <div className="profile-sidebar">
              <div className="profile-header">
                <div className="profile-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
                </div>
                <h3>{user.name || 'Guest User'}</h3>
                <p>{user.email || 'No email provided'}</p>
              </div>
              
              <nav className="profile-nav">
                <button 
                  className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FiUser className="nav-icon" />
                  Profile Information
                </button>
                <button 
                  className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <FiShoppingBag className="nav-icon" />
                  My Orders
                </button>
                <button 
                  className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <FiHeart className="nav-icon" />
                  Wishlist
                </button>
                <button 
                  className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <FiLock className="nav-icon" />
                  Security
                </button>
                <button 
                  className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <FiSettings className="nav-icon" />
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="profile-content">
              {activeTab === 'profile' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2>Profile Information</h2>
                    <p>Update your personal information</p>
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                    </button>
                  </div>

                  <form onSubmit={handleSaveProfile} className="profile-form">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiUser />
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiMail />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiPhone />
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={user.phone}
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiMapPin />
                        </span>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={user.address}
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="form-actions">
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="orders-section">
                  <div className="section-header">
                    <h2>My Orders</h2>
                    <p>View your order history</p>
                  </div>

                  {ordersLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3">Loading orders...</p>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="orders-list">
                      {orders.map(order => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <div className="order-number">
                              <FiPackage className="me-2" />
                              Order #{order.order_number}
                            </div>
                            <div className={`order-status ${order.status?.toLowerCase() || 'pending'}`}>
                              {order.status || 'Pending'}
                            </div>
                          </div>
                          
                          <div className="order-details">
                            <div className="order-date">
                              <FiCalendar className="me-2" />
                              {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}
                            </div>
                            <div className="order-total">
                              <FiDollarSign className="me-2" />
                              ${typeof order.total_amount === 'number' ? order.total_amount.toFixed(2) : '0.00'}
                            </div>
                          </div>

                          <div className="order-items">
                            {order.items && order.items.map(item => (
                              <div key={item.id} className="order-item">
                                <img 
                                  src={item.product?.image ? `http://localhost:8000/storage/${item.product.image}` : 'https://via.placeholder.com/50'} 
                                  alt={item.product?.name || 'Product image'} 
                                  className="item-image"
                                />
                                <div className="item-details">
                                  <h4>{item.product?.name || 'Unnamed Product'}</h4>
                                  <p>Quantity: {item.quantity || 0}</p>
                                  <p>Price: ${typeof item.unit_price === 'number' ? item.unit_price.toFixed(2) : '0.00'}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="order-actions">
                            <button className="btn btn-outline-primary btn-sm">
                              View Details
                            </button>
                            {order.status === 'pending' && (
                              <button className="btn btn-outline-danger btn-sm">
                                Cancel Order
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <FiShoppingBag className="empty-icon" />
                      <h3>No Orders Yet</h3>
                      <p>You haven't placed any orders yet.</p>
                      <button 
                        className="btn btn-primary mt-3"
                        onClick={() => navigate('/shop')}
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="wishlist-section">
                  <div className="section-header">
                    <h2>My Wishlist</h2>
                    <p>View your saved items</p>
                  </div>
                  <div className="empty-state">
                    <FiHeart className="empty-icon" />
                    <h3>No Items in Wishlist</h3>
                    <p>You haven't saved any items yet.</p>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="security-section">
                  <div className="section-header">
                    <h2>Security Settings</h2>
                    <p>Manage your account security</p>
                  </div>
                  <div className="security-options">
                    <button className="security-option">
                      <FiLock className="option-icon" />
                      <div className="option-content">
                        <h3>Change Password</h3>
                        <p>Update your account password</p>
                      </div>
                    </button>
                    <button className="security-option">
                      <FiSettings className="option-icon" />
                      <div className="option-content">
                        <h3>Two-Factor Authentication</h3>
                        <p>Add an extra layer of security</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="settings-section">
                  <div className="section-header">
                    <h2>Account Settings</h2>
                    <p>Manage your account preferences</p>
                  </div>
                  <div className="settings-options">
                    <div className="setting-item">
                      <h3>Email Notifications</h3>
                      <p>Receive updates about your orders and promotions</p>
                      <div className="toggle-switch">
                        <input type="checkbox" id="email-notifications" />
                        <label htmlFor="email-notifications"></label>
                      </div>
                    </div>
                    <div className="setting-item">
                      <h3>Newsletter Subscription</h3>
                      <p>Get the latest updates and offers</p>
                      <div className="toggle-switch">
                        <input type="checkbox" id="newsletter" />
                        <label htmlFor="newsletter"></label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 