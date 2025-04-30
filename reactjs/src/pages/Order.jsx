import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiClock, FiCheck, FiX, FiArrowLeft, FiEye } from 'react-icons/fi';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // In a real application, this would be an API call to fetch orders
      const response = await axios.get('http://localhost:8000/api/orders');
      
      // Ensure we're setting an array, even if the API returns unexpected data
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      } else {
        console.error('API returned unexpected data format:', response.data);
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
      // Mock data for demonstration
      setOrders([
        {
          id: 'ORD-12345',
          date: '2023-05-15',
          status: 'Delivered',
          total: 129.99,
          items: [
            { id: 1, name: 'Organic Face Cream', price: 49.99, quantity: 1, image: 'https://via.placeholder.com/80' },
            { id: 2, name: 'Natural Shampoo', price: 24.99, quantity: 2, image: 'https://via.placeholder.com/80' },
            { id: 3, name: 'Hand Lotion', price: 15.00, quantity: 1, image: 'https://via.placeholder.com/80' }
          ],
          shippingAddress: {
            name: 'John Doe',
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'United States'
          },
          paymentMethod: 'Credit Card (****1234)'
        },
        {
          id: 'ORD-12346',
          date: '2023-05-10',
          status: 'Processing',
          total: 89.99,
          items: [
            { id: 4, name: 'Body Wash', price: 19.99, quantity: 1, image: 'https://via.placeholder.com/80' },
            { id: 5, name: 'Face Serum', price: 69.99, quantity: 1, image: 'https://via.placeholder.com/80' }
          ],
          shippingAddress: {
            name: 'John Doe',
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'United States'
          },
          paymentMethod: 'PayPal'
        },
        {
          id: 'ORD-12347',
          date: '2023-04-28',
          status: 'Delivered',
          total: 149.99,
          items: [
            { id: 6, name: 'Hair Conditioner', price: 29.99, quantity: 1, image: 'https://via.placeholder.com/80' },
            { id: 7, name: 'Facial Cleanser', price: 34.99, quantity: 1, image: 'https://via.placeholder.com/80' },
            { id: 8, name: 'Body Lotion', price: 24.99, quantity: 2, image: 'https://via.placeholder.com/80' }
          ],
          shippingAddress: {
            name: 'John Doe',
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'United States'
          },
          paymentMethod: 'Credit Card (****1234)'
        }
      ]);
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