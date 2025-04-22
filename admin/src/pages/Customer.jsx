import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:8000/api';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/customers');
      setCustomers(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch customers');
      console.error('Error fetching customers:', error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.password || !formData.password_confirmation) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Validate password match
      if (formData.password !== formData.password_confirmation) {
        toast.error('Passwords do not match');
        return;
      }

      const formDataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone ? formData.phone.trim() : null,
        address: formData.address ? formData.address.trim() : null,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      };

      if (editingCustomer) {
        // For update, only send password if it's changed
        if (!formDataToSend.password) {
          delete formDataToSend.password;
          delete formDataToSend.password_confirmation;
        }
        await axios.put(`/customers/${editingCustomer.id}`, formDataToSend);
        toast.success('Customer updated successfully');
      } else {
        await axios.post('/customers', formDataToSend);
        toast.success('Customer added successfully');
      }
      
      setShowModal(false);
      setEditingCustomer(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: ''
      });
      fetchCustomers();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        Object.keys(error.response.data.errors).forEach(key => {
          toast.error(error.response.data.errors[key][0]);
        });
      } else {
        toast.error(error.response?.data?.message || 'Operation failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address || '',
      password: '',
      password_confirmation: ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`/customers/${id}`);
        toast.success('Customer deleted successfully');
        fetchCustomers();
      } catch (error) {
        toast.error('Failed to delete customer');
      }
    }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ bottom: '20px' }}
          />
          
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Customer Management</h4>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="ri-add-line me-2"></i> Add Customer
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
                        <i className="ri-list-check me-2"></i> All Customers
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Customer List</h5>
                  <div className="d-flex gap-2">
                    <div className="input-group input-group-sm" style={{ width: '300px' }}>
                      <span className="input-group-text bg-transparent">
                        <FiSearch className="text-muted" />
                      </span>
                      <input 
                        type="text" 
                        className="form-control border-start-0" 
                        placeholder="Search customers..."
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            <div className="d-flex justify-content-center">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : customers.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            <div className="d-flex flex-column align-items-center">
                              <i className="ri-user-line fs-1 text-muted mb-2"></i>
                              <p className="text-muted mb-0">No customers found</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        customers.map((customer) => (
                          <tr key={customer.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-lg me-3">
                                  <div className="avatar-initial bg-label-primary rounded-circle">
                                    <span className="fs-4">{customer.name.charAt(0).toUpperCase()}</span>
                                  </div>
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-semibold">{customer.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="text-muted">{customer.email}</span>
                            </td>
                            <td>
                              <span className="fw-semibold">{customer.phone || 'N/A'}</span>
                            </td>
                            <td>
                              <span className="text-muted">{customer.address || 'N/A'}</span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button 
                                  className="btn btn-sm btn-icon btn-outline-primary"
                                  onClick={() => handleEdit(customer)}
                                  title="Edit"
                                >
                                  <FiEdit2 />
                                </button>
                                <button 
                                  className="btn btn-sm btn-icon btn-outline-danger"
                                  onClick={() => handleDelete(customer.id)}
                                  title="Delete"
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

            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl">
                <div className="footer-container d-flex align-items-center justify-content-between py-3 flex-md-row flex-column">
                  <div className="mb-2 mb-md-0">
                    © {new Date().getFullYear()}, made with <span className="text-danger">❤️</span> by Your Company
                  </div>
                  <div>
                    <a href="#" className="footer-link me-4">License</a>
                    <a href="#" className="footer-link me-4">Help</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Add/Edit Customer Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">
                  {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowModal(false);
                    setEditingCustomer(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      address: '',
                      password: '',
                      password_confirmation: ''
                    });
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="row g-3">
                  {/* Name */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiUser className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter customer name"
                        required
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiMail className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Phone</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiPhone className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiMapPin className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                      />
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiLock className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required={!editingCustomer}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Password Confirmation */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <FiLock className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required={!editingCustomer}
                      />
                      {errors.password_confirmation && (
                        <div className="invalid-feedback">{errors.password_confirmation[0]}</div>
                      )}
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
                          setEditingCustomer(null);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            address: '',
                            password: '',
                            password_confirmation: ''
                          });
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editingCustomer ? 'Update Customer' : 'Add Customer'}
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
};

export default Customer;