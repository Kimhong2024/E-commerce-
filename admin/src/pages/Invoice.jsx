import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set axios base URL
axios.defaults.baseURL = 'http://localhost:8000/api';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    order_id: '',
    invoice_number: '',
    invoice_date: '',
    due_date: '',
    total_amount: '',
    tax_amount: '',
    shipping_amount: '',
    discount_amount: '',
    status: 'draft',
    notes: '',
    billing_address: '',
    shipping_address: ''
  });
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [settings, setSettings] = useState({
    company_name: '',
    tax_id: '',
    address: '',
    phone: '',
    email: '',
    prefix: 'INV-',
    terms: '',
    notes: '',
    logo: null
  });
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    fetchInvoices();
    fetchOrders();
    fetchSettings();
  }, [currentPage, search, statusFilter, dateFrom, dateTo]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/invoices', {
        params: {
          page: currentPage,
          search,
          status: statusFilter,
          date_from: dateFrom,
          date_to: dateTo
        }
      });
      setInvoices(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      toast.error('Error fetching invoices');
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders');
      setOrders(response.data.data);
    } catch (error) {
      toast.error('Error fetching orders');
      console.error('Error fetching orders:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/invoice-settings');
      if (response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDateFilter = (from, to) => {
    setDateFrom(from);
    setDateTo(to);
    setCurrentPage(1);
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    
    if (name === 'order_id') {
      // Find the selected order
      const selectedOrder = orders.find(order => order.id === parseInt(value));
      if (selectedOrder) {
        // Update form with order details
        setFormData(prev => ({
          ...prev,
          [name]: value,
          total_amount: selectedOrder.total_amount,
          // You can also pre-fill other fields if needed
          billing_address: selectedOrder.billing_address || prev.billing_address,
          shipping_address: selectedOrder.shipping_address || prev.shipping_address
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSettingsInput = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setSettings(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`/invoices/${formData.id}`, formData);
        toast.success('Invoice updated successfully');
      } else {
        await axios.post('/invoices', formData);
        toast.success('Invoice created successfully');
      }
      setShowModal(false);
      fetchInvoices();
    } catch (error) {
      toast.error('Error saving invoice');
      console.error('Error saving invoice:', error);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Debug log before submission
      console.log('Submitting settings:', {
        company_name: settings.company_name,
        address: settings.address,
        phone: settings.phone,
        email: settings.email,
        prefix: settings.prefix,
        logo: settings.logo instanceof File ? settings.logo.name : settings.logo
      });
      
      // Add required fields
      formData.append('company_name', settings.company_name || '');
      formData.append('address', settings.address || '');
      formData.append('phone', settings.phone || '');
      formData.append('email', settings.email || '');
      formData.append('prefix', settings.prefix || 'INV-');
      
      // Add optional fields
      if (settings.tax_id) formData.append('tax_id', settings.tax_id);
      if (settings.terms) formData.append('terms', settings.terms);
      if (settings.notes) formData.append('notes', settings.notes);
      if (settings.logo instanceof File) formData.append('logo', settings.logo);
      
      const response = await axios.post('/invoice-settings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success('Settings saved successfully');
      fetchSettings();
    } catch (error) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data
      });
      
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, [message]]) => {
          toast.error(`${field}: ${message}`);
        });
      } else {
        toast.error('Error saving settings');
      }
    }
  };

  const handleEdit = (invoice) => {
    setFormData(invoice);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await axios.delete(`/invoices/${id}`);
        toast.success('Invoice deleted successfully');
        fetchInvoices();
      } catch (error) {
        toast.error('Error deleting invoice');
        console.error('Error deleting invoice:', error);
      }
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`/invoices/${id}/download`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Error downloading invoice');
      console.error('Error downloading invoice:', error);
    }
  };

  const handleSend = async (id) => {
    try {
      await axios.post(`/invoices/${id}/send`);
      toast.success('Invoice sent successfully');
      fetchInvoices();
    } catch (error) {
      toast.error('Error sending invoice');
      console.error('Error sending invoice:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`/invoices/${id}/status`, { status });
      toast.success('Invoice status updated successfully');
      fetchInvoices();
    } catch (error) {
      toast.error('Error updating invoice status');
      console.error('Error updating invoice status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-500';
      case 'sent':
        return 'bg-blue-500';
      case 'paid':
        return 'bg-green-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Sidebar Menu - Same as Home.jsx */}

        {/* Layout container */}
        <div className="layout-page">

          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Invoice Management</h4>
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        setFormData({
                          order_id: '',
                          invoice_number: '',
                          invoice_date: '',
                          due_date: '',
                          total_amount: '',
                          tax_amount: '',
                          shipping_amount: '',
                          discount_amount: '',
                          status: 'draft',
                          notes: '',
                          billing_address: '',
                          shipping_address: ''
                        });
                        setShowModal(true);
                      }}
                    >
                        <i className="ri-add-line me-2"></i> Create Invoice
                      </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="row mb-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeTab === 'list' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('list')} 
                        href="#" 
                        role="tab"
                      >
                        <i className="ri-file-list-line me-2"></i> Invoices
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('settings')} 
                        href="#" 
                        role="tab"
                      >
                        <i className="ri-settings-3-line me-2"></i> Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Invoices Tab */}
                <div className={`tab-pane fade ${activeTab === 'list' ? 'show active' : ''}`} id="invoices" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Invoice List</h5>
                      <div className="d-flex gap-2">
                        <div className="input-group input-group-sm" style={{ width: '300px' }}>
                          <span className="input-group-text bg-transparent">
                            <i className="ri-search-line"></i>
                          </span>
                          <input 
                            type="text" 
                            className="form-control border-start-0" 
                            placeholder="Search invoices..."
                            value={search}
                            onChange={handleSearch}
                          />
                          {search && (
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => setSearch('')}
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          )}
                        </div>
                        <select
                          className="form-select form-select-sm"
                          value={statusFilter}
                          onChange={handleStatusFilter}
                          style={{ width: '150px' }}
                        >
                          <option value="">All Status</option>
                          <option value="draft">Draft</option>
                          <option value="sent">Sent</option>
                          <option value="paid">Paid</option>
                          <option value="overdue">Overdue</option>
                          </select>
                        <div className="input-group input-group-sm" style={{ width: '300px' }}>
                          <input
                            type="date"
                            className="form-control"
                            value={dateFrom}
                            onChange={(e) => handleDateFilter(e.target.value, dateTo)}
                          />
                          <span className="input-group-text">to</span>
                          <input
                            type="date"
                            className="form-control"
                            value={dateTo}
                            onChange={(e) => handleDateFilter(dateFrom, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Invoice #</th>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Due Date</th>
                            <th>Amount</th>
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
                          ) : invoices.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="text-center py-4">
                                <div className="d-flex flex-column align-items-center">
                                  <i className="ri-search-line fs-1 text-muted mb-2"></i>
                                  <p className="text-muted mb-0">No invoices found</p>
                                  {search && (
                                    <small className="text-muted">Try adjusting your search</small>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ) : (
                            invoices.map((invoice) => (
                              <tr key={invoice.id}>
                                <td>
                                  <span className="fw-semibold">{invoice.invoice_number}</span>
                                </td>
                                <td>
                                  {invoice.order?.order_number}
                                </td>
                                <td>
                                  {new Date(invoice.invoice_date).toLocaleDateString()}
                                </td>
                                <td>
                                  {new Date(invoice.due_date).toLocaleDateString()}
                                </td>
                                <td>
                                  <span className="fw-semibold">${invoice.total_amount}</span>
                                </td>
                                <td>
                                  <span className={`badge ${getStatusColor(invoice.status)}`}>
                                    {invoice.status}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button 
                                      className="btn btn-sm btn-icon btn-outline-primary"
                                      onClick={() => handleEdit(invoice)}
                                      title="Edit"
                                    >
                                      <i className="ri-edit-line" />
                                    </button>
                                    <button 
                                      className="btn btn-sm btn-icon btn-outline-danger"
                                      onClick={() => handleDelete(invoice.id)}
                                      title="Delete"
                                    >
                                      <i className="ri-delete-bin-line" />
                                    </button>
                                    <button 
                                      className="btn btn-sm btn-icon btn-outline-info"
                                      onClick={() => handleDownload(invoice.id)}
                                      title="Download"
                                    >
                                      <i className="ri-download-line" />
                                    </button>
                                    {invoice.status === 'draft' && (
                                      <button 
                                        className="btn btn-sm btn-icon btn-outline-success"
                                        onClick={() => handleSend(invoice.id)}
                                        title="Send"
                                      >
                                        <i className="ri-send-plane-line" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <div className="text-muted">
                        Showing page <span className="fw-semibold">{currentPage}</span> of <span className="fw-semibold">{totalPages}</span>
                      </div>
                      <nav aria-label="Page navigation">
                        <ul className="pagination pagination-sm mb-0">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a 
                              className="page-link" 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) => Math.max(prev - 1, 1));
                              }}
                            >
                              <i className="ri-arrow-left-s-line"></i>
                            </a>
                          </li>
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <a 
                              className="page-link" 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                              }}
                            >
                              <i className="ri-arrow-right-s-line"></i>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Settings Tab */}
                <div className={`tab-pane fade ${activeTab === 'settings' ? 'show active' : ''}`} id="settings" role="tabpanel">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Invoice Settings</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSettingsSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Company Name <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              name="company_name"
                              value={settings.company_name}
                              onChange={handleSettingsInput}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Tax ID</label>
                            <input
                              type="text"
                              name="tax_id"
                              value={settings.tax_id}
                              onChange={handleSettingsInput}
                              className="form-control"
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label">Address <span className="text-danger">*</span></label>
                              <textarea 
                              name="address"
                              value={settings.address}
                              onChange={handleSettingsInput}
                              rows="3"
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone <span className="text-danger">*</span></label>
                            <input
                              type="text"
                              name="phone"
                              value={settings.phone}
                              onChange={handleSettingsInput}
                                className="form-control" 
                              required
                              />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email <span className="text-danger">*</span></label>
                                <input 
                              type="email"
                              name="email"
                              value={settings.email}
                              onChange={handleSettingsInput}
                                  className="form-control" 
                              required
                                />
                              </div>
                          <div className="col-md-6">
                            <label className="form-label">Invoice Prefix <span className="text-danger">*</span></label>
                              <input 
                                type="text" 
                              name="prefix"
                              value={settings.prefix}
                              onChange={handleSettingsInput}
                              className="form-control"
                              required
                              maxLength="10"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Logo</label>
                            <input
                              type="file"
                              name="logo"
                              onChange={handleSettingsInput}
                              accept="image/jpeg,image/png,image/jpg,image/gif"
                              className="form-control"
                            />
                            <small className="text-muted">Max file size: 2MB. Supported formats: JPEG, PNG, JPG, GIF</small>
                          </div>
                          <div className="col-12">
                            <label className="form-label">Terms & Conditions</label>
                            <textarea
                              name="terms"
                              value={settings.terms}
                              onChange={handleSettingsInput}
                              rows="4"
                              className="form-control"
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label">Notes</label>
                            <textarea
                              name="notes"
                              value={settings.notes}
                              onChange={handleSettingsInput}
                              rows="4"
                                className="form-control" 
                              />
                          </div>
                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              Save Settings
                          </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
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

      {/* Add/Edit Invoice Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">
                  {formData.id ? 'Edit Invoice' : 'Create Invoice'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Order</label>
                    <select
                      name="order_id"
                      value={formData.order_id}
                      onChange={handleFormInput}
                      className="form-select"
                      required
                    >
                      <option value="">Select Order</option>
                      {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                          {order.order_number} - ${order.total_amount}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Invoice Number</label>
                    <input
                      type="text"
                      name="invoice_number"
                      value={formData.invoice_number}
                      onChange={handleFormInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Invoice Date</label>
                    <input
                      type="date"
                      name="invoice_date"
                      value={formData.invoice_date}
                      onChange={handleFormInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Due Date</label>
                    <input
                      type="date"
                      name="due_date"
                      value={formData.due_date}
                      onChange={handleFormInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Total Amount</label>
                    <input
                      type="number"
                      name="total_amount"
                      value={formData.total_amount}
                      className="form-control"
                      required
                      readOnly
                    />
                    <small className="text-muted">Automatically calculated from order total</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tax Amount</label>
                    <input
                      type="number"
                      name="tax_amount"
                      value={formData.tax_amount}
                      onChange={handleFormInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Shipping Amount</label>
                    <input
                      type="number"
                      name="shipping_amount"
                      value={formData.shipping_amount}
                      onChange={handleFormInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Discount Amount</label>
                    <input
                      type="number"
                      name="discount_amount"
                      value={formData.discount_amount}
                      onChange={handleFormInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleFormInput}
                      className="form-select"
                      required
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleFormInput}
                      rows="3"
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Billing Address</label>
                    <textarea
                      name="billing_address"
                      value={formData.billing_address}
                      onChange={handleFormInput}
                      rows="3"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Shipping Address</label>
                    <textarea
                      name="shipping_address"
                      value={formData.shipping_address}
                      onChange={handleFormInput}
                      rows="3"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end gap-2">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {formData.id ? 'Update Invoice' : 'Create Invoice'}
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

export default Invoice;