import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPackage, FiClock, FiCheck, FiX, FiArrowLeft, FiEye } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [currentToken, setCurrentToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Listen for storage changes (like when token is removed during logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      if (newToken !== currentToken) {
        setCurrentToken(newToken);
        if (!newToken) {
          // Clear all states when user logs out
          setOrders([]);
          setError(null);
          navigate('/login');
        } else {
          // Fetch fresh data when new user logs in
          fetchOrders();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentToken, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to view your orders');
      toast.error('Please login to view your orders');
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
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
      
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
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
        setError('Failed to load orders. Please try again later.');
        toast.error('Failed to load orders');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FiCheck className="status-icon delivered" />;
      case 'Processing':
        return <FiClock className="status-icon processing" />;
      case 'Cancelled':
        return <FiX className="status-icon cancelled" />;
      default:
        return <FiPackage className="status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Processing':
        return 'status-processing';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/80';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000/storage/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="order-page">
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-page">
        <div className="container py-5">
          <div className="alert alert-danger text-center">
            {error}
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={fetchOrders}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showOrderDetails && selectedOrder) {
    return (
      <div className="order-page">
        <div className="container py-5">
          <div className="order-details-container">
            <div className="order-details-header">
              <button 
                className="btn btn-link back-button"
                onClick={handleCloseOrderDetails}
              >
                <FiArrowLeft /> Back to Orders
              </button>
              <h1>Order Details</h1>
              <div className="order-id">Order #{selectedOrder.order_number || selectedOrder.id}</div>
            </div>

            <div className="order-details-content">
              <div className="order-info-section">
                <div className="order-status-container">
                  <div className={`order-status ${getStatusClass(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span>{selectedOrder.status}</span>
                  </div>
                  <div className="order-date">
                    Placed on {new Date(selectedOrder.order_date || selectedOrder.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="order-summary">
                  <h2>Order Summary</h2>
                  <div className="order-items">
                    {selectedOrder.items && selectedOrder.items.map(item => (
                      <div key={item.id} className="order-item">
                        <div className="item-image">
                          <img 
                            src={getImageUrl(item.product?.image || item.image)} 
                            alt={item.product?.name || item.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80';
                            }}
                          />
                        </div>
                        <div className="item-details">
                          <h3>{item.product?.name || item.name}</h3>
                          <p className="item-price">${item.unit_price || item.price}</p>
                          <p className="item-quantity">Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-total">
                          ${(item.total_price || (item.price * item.quantity)).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-totals">
                    <div className="total-row">
                      <span>Subtotal</span>
                      <span>${selectedOrder.total_amount || selectedOrder.total}</span>
                    </div>
                    <div className="total-row">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="total-row total">
                      <span>Total</span>
                      <span>${selectedOrder.total_amount || selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-details-grid">
                <div className="shipping-info">
                  <h2>Shipping Information</h2>
                  <div className="info-content">
                    {selectedOrder.shipping_address ? (
                      <p>{selectedOrder.shipping_address}</p>
                    ) : selectedOrder.shippingAddress ? (
                      <>
                        <p>{selectedOrder.shippingAddress.name}</p>
                        <p>{selectedOrder.shippingAddress.address}</p>
                        <p>
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                        </p>
                        <p>{selectedOrder.shippingAddress.country}</p>
                      </>
                    ) : (
                      <p>No shipping information available</p>
                    )}
                  </div>
                </div>

                <div className="payment-info">
                  <h2>Payment Method</h2>
                  <div className="info-content">
                    <p>{selectedOrder.paymentMethod || 'Credit Card'}</p>
                    <p>Status: {selectedOrder.payment_status || 'Paid'}</p>
                  </div>
                </div>
              </div>

              <div className="order-actions">
                <Link to="/shop" className="btn btn-primary">
                  Continue Shopping
                </Link>
                {selectedOrder.status === 'Delivered' && (
                  <button className="btn btn-outline-primary">
                    Download Invoice
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="container py-5">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>View and track your order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-content">
              <FiPackage className="empty-icon" />
              <h2>No Orders Yet</h2>
              <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
              <Link to="/shop" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-info">
                    <div className="order-id">Order #{order.order_number || order.id}</div>
                    <div className="order-date">
                      Placed on {new Date(order.order_date || order.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="order-items-preview">
                  {order.items && order.items.slice(0, 3).map(item => (
                    <div key={item.id} className="preview-item">
                      <img 
                        src={getImageUrl(item.product?.image || item.image)}
                        alt={item.product?.name || item.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80';
                        }}
                      />
                      <div className="preview-item-details">
                        <h3>{item.product?.name || item.name}</h3>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items && order.items.length > 3 && (
                    <div className="more-items">
                      +{order.items.length - 3} more items
                    </div>
                  )}
                </div>

                <div className="order-card-footer">
                  <div className="order-total">
                    Total: <span>${order.total_amount || order.total}</span>
                  </div>
                  <button 
                    className="btn btn-outline-primary view-details-btn"
                    onClick={() => handleViewOrderDetails(order)}
                  >
                    <FiEye className="me-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order; 