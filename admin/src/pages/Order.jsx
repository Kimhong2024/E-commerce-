import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiPackage, FiUser, FiCalendar, FiDollarSign, FiCreditCard, FiCheck, FiX, FiSearch, FiEdit2, FiTrash2, FiMapPin, FiFilter } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:8000/api';

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    payment_status: '',
    date_from: '',
    date_to: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: '',
    items: [{ product_id: '', quantity: 1, unit_price: 0 }],
    shipping_address: '',
    billing_address: '',
    order_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, [searchTerm, filters]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        ...filters
      };
      const response = await axios.get('/orders', { params });
      console.log('Orders response:', response.data);
      setOrders(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/customers');
      setCustomers(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch customers');
      console.error('Error fetching customers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await axios.get('/products');
      console.log('Products response:', response.data);
      // Check if response.data is an array or has a data property
      const productsData = Array.isArray(response.data) ? response.data : response.data.data;
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // If searching for a specific order ID, you can add specific handling here
    if (value.startsWith('ORD-')) {
      console.log('Searching for specific order:', value);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    
    // Update unit price when product is selected
    if (field === 'product_id') {
      const selectedProduct = products.find(p => p.id === parseInt(value));
      if (selectedProduct) {
        newItems[index].unit_price = selectedProduct.price;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { product_id: '', quantity: 1, unit_price: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      return total + (item.quantity * item.unit_price);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        ...formData,
        total_amount: calculateTotal()
      };

      console.log('Sending order data:', orderData);

      const response = await axios.post('/orders', orderData);
      console.log('Order creation response:', response.data);

      toast.success('Order created successfully');
      setShowModal(false);
      setFormData({
        customer_id: '',
        items: [{ product_id: '', quantity: 1, unit_price: 0 }],
        shipping_address: '',
        billing_address: '',
        order_date: new Date().toISOString().split('T')[0]
      });
      fetchOrders();
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to create order');
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Error updating order status:', error);
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`/orders/${orderId}`);
        toast.success('Order deleted successfully');
        fetchOrders();
      } catch (error) {
        toast.error('Failed to delete order');
        console.error('Error deleting order:', error);
      }
    }
  };

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'info';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      payment_status: '',
      date_from: '',
      date_to: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Order Management</h4>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowModal(true)}
                    >
                        <i className="ri-add-line me-2"></i> Create Order
                      </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="row mb-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" data-bs-toggle="tab" href="#all-products" role="tab">
                        <i className="ri-list-check me-2"></i> All Order
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Orders Table */}
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Order List</h5>
                  <div className="d-flex gap-2">
                        <div className="input-group input-group-sm" style={{ width: '300px' }}>
                          <span className="input-group-text bg-transparent">
                            <i className="ri-search-line"></i>
                          </span>
                          <input 
                            type="text" 
                            className="form-control border-start-0" 
                            placeholder="Search by Order ID (e.g., ORD-XXXXXX) or customer name..."
                            value={searchTerm}
                            onChange={handleSearch}
                          />
                          {searchTerm && (
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => setSearchTerm('')}
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          )}
                        </div>
                      </div>
                 
                    </div>
                    <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <div className="d-flex justify-content-center">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : orders.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <div className="d-flex flex-column align-items-center">
                              <i className="ri-shopping-cart-line fs-1 text-muted mb-2"></i>
                              <p className="text-muted mb-0">No orders found</p>
                              {(searchTerm || Object.values(filters).some(Boolean)) && (
                                <small className="text-muted">Try adjusting your search or filters</small>
                              )}
                            </div>
                          </td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-lg me-3">
                                  <div className="avatar-initial bg-label-primary rounded-circle">
                                    <FiPackage className="fs-4" />
                                  </div>
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-semibold">{order.order_number}</h6>
                                  <small className="text-muted">#{order.id}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-sm me-2">
                                  <div className="avatar-initial bg-label-info rounded-circle">
                                    <span className="fs-4">{order.customer?.name?.charAt(0)?.toUpperCase() || '?'}</span>
                                  </div>
                                </div>
                                <div>
                                  <h6 className="mb-0">{order.customer?.name || 'N/A'}</h6>
                                  <small className="text-muted">{order.customer?.email || 'N/A'}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="text-muted">
                                {new Date(order.order_date).toLocaleDateString()}
                              </span>
                            </td>
                            <td>
                              <span className="fw-semibold">${order.total_amount}</span>
                              <br />
                              <small className="text-muted">
                                {order.items?.length || 0} items
                                {order.items?.length > 0 && (
                                  <div className="mt-1">
                                    {order.items.map((item, index) => (
                                      <div key={index} className="text-truncate" style={{ maxWidth: '200px' }}>
                                        {item.product?.name} (x{item.quantity})
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </small>
                            </td>
                            <td>
                              <span className={`badge bg-${order.payment_status === 'paid' ? 'success' : 'warning'}`}>
                                {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <span className={`badge bg-${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </td>
                              <td>
                              <div className="d-flex gap-2">
                                <button 
                                  className="btn btn-sm btn-icon btn-outline-primary"
                                  onClick={() => handleStatusUpdate(order.id, 'completed')}
                                  disabled={order.status === 'completed'}
                                  title="Complete Order"
                                >
                                  <FiCheck />
                                  </button>
                                <button 
                                  className="btn btn-sm btn-icon btn-outline-danger"
                                  onClick={() => handleDelete(order.id)}
                                  title="Delete Order"
                                >
                                  <FiTrash2 />
                                  </button>
                                </div>
                              </td>
                            </tr>
                        ))
                      )}
                        </tbody>
                      </table>
                    </div>
                    
              </div>
                      </div>
                    </div>
                  </div>
                </div>

      {/* Create Order Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">
                  Create New Order
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowModal(false);
                    setFormData({
                      customer_id: '',
                      items: [{ product_id: '', quantity: 1, unit_price: 0 }],
                      shipping_address: '',
                      billing_address: '',
                      order_date: new Date().toISOString().split('T')[0]
                    });
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="row g-3">
                  {/* Order Date */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Order Date</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiCalendar className="text-muted" />
                      </span>
                      <input
                        type="date"
                        className="form-control"
                        name="order_date"
                        value={formData.order_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Customer Selection */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Select Customer</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiUser className="text-muted" />
                                </span>
                      <select
                        className="form-select"
                        name="customer_id"
                        value={formData.customer_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name} - {customer.email}
                          </option>
                        ))}
                      </select>
                  </div>
                </div>

                  {/* Order Items */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Order Items</label>
                    {formData.items.map((item, index) => (
                      <div key={index} className="row g-3 mb-2 border rounded p-3">
                        <div className="col-md-5">
                          <label className="form-label">Product</label>
                          <div className="input-group">
                            <span className="input-group-text bg-transparent">
                              <FiPackage className="text-muted" />
                            </span>
                            <select
                              className="form-select"
                              value={item.product_id}
                              onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                              required
                              disabled={productsLoading}
                            >
                              <option value="">Select Product</option>
                              {productsLoading ? (
                                <option disabled>Loading products...</option>
                              ) : products.length > 0 ? (
                                products.map(product => (
                                  <option key={product.id} value={product.id}>
                                    {product.name} - ${product.price}
                                  </option>
                                ))
                              ) : (
                                <option disabled>No products available</option>
                              )}
                          </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Quantity</label>
                          <div className="input-group">
                            <span className="input-group-text bg-transparent">
                              <FiPackage className="text-muted" />
                            </span>
                            <input
                              type="number"
                              className="form-control"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                              min="1"
                              required
                              disabled={!item.product_id}
                            />
                      </div>
                    </div>
                        <div className="col-md-3">
                          <label className="form-label">Unit Price</label>
                          <div className="input-group">
                            <span className="input-group-text bg-transparent">
                              <FiDollarSign className="text-muted" />
                                </span>
                            <input
                              type="number"
                              className="form-control"
                              value={item.unit_price}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-1 d-flex align-items-end">
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => removeItem(index)}
                            >
                              <FiX />
                                  </button>
                          )}
                        </div>
                                </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-primary mt-2"
                      onClick={addItem}
                      disabled={productsLoading}
                    >
                      <i className="ri-add-line me-2"></i>Add Item
                    </button>
                </div>

                  {/* Total Amount */}
                  <div className="col-12">
                    <div className="card bg-light">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Total Amount</h6>
                          <h4 className="mb-0 text-primary">
                            ${calculateTotal().toFixed(2)}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Shipping Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiMapPin className="text-muted" />
                      </span>
                      <textarea
                        className="form-control"
                        name="shipping_address"
                        value={formData.shipping_address}
                        onChange={handleInputChange}
                        rows="3"
                        required
                        placeholder="Enter shipping address"
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Billing Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiCreditCard className="text-muted" />
                                </span>
                      <textarea
                        className="form-control"
                        name="billing_address"
                        value={formData.billing_address}
                        onChange={handleInputChange}
                        rows="3"
                        required
                        placeholder="Enter billing address"
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setShowModal(false);
                          setFormData({
                            customer_id: '',
                            items: [{ product_id: '', quantity: 1, unit_price: 0 }],
                            shipping_address: '',
                            billing_address: '',
                            order_date: new Date().toISOString().split('T')[0]
                          });
                        }}
                      >
                        Cancel
                                  </button>
                      <button type="submit" className="btn btn-primary">
                        Create Order
                                    </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;