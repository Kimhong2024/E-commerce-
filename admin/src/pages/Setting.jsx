import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

function Setting() {
  const [activeTab, setActiveTab] = useState('general-settings');
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    general: {
      storeName: '',
      storeEmail: '',
      storePhone: '',
      storeAddress: '',
      timezone: '',
      currency: '',
      maintenanceMode: false
    },
    paymentMethods: [],
    shippingOptions: [],
    emailTemplates: [],
    adminUsers: []
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/admin/settings');
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleGeneralSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handlePaymentMethodChange = (id, field, value) => {
    setSettings(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(method => 
        method.id === id ? { ...method, [field]: value } : method
      )
    }));
  };

  const handleShippingOptionChange = (id, field, value) => {
    setSettings(prev => ({
      ...prev,
      shippingOptions: prev.shippingOptions.map(option => 
        option.id === id ? { ...option, [field]: value } : option
      )
    }));
  };

  const handleEmailTemplateChange = (id, field, value) => {
    setSettings(prev => ({
      ...prev,
      emailTemplates: prev.emailTemplates.map(template => 
        template.id === id ? { ...template, [field]: value } : template
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    try {
      await axios.put('/admin/settings', settings);
      setSuccessMessage('Settings updated successfully!');
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'An error occurred while updating settings' });
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-4">
                <div className="col-12">
                  <h4 className="fw-bold mb-0">Settings</h4>
                </div>
              </div>

              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              {errors.general && (
                <div className="alert alert-danger" role="alert">
                  {errors.general}
                </div>
              )}

              {/* Tabs */}
              <div className="row mb-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'general-settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general-settings')}
                      >
                        <i className="ri-settings-3-line me-2"></i> General Settings
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'payment-methods' ? 'active' : ''}`}
                        onClick={() => setActiveTab('payment-methods')}
                      >
                        <i className="ri-bank-card-line me-2"></i> Payment Methods
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'shipping-options' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shipping-options')}
                      >
                        <i className="ri-truck-line me-2"></i> Shipping Options
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'email-templates' ? 'active' : ''}`}
                        onClick={() => setActiveTab('email-templates')}
                      >
                        <i className="ri-mail-line me-2"></i> Email Templates
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* General Settings Tab */}
                {activeTab === 'general-settings' && (
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">General Settings</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Store Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="storeName"
                            value={settings.general.storeName}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Store Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="storeEmail"
                            value={settings.general.storeEmail}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Store Phone</label>
                          <input
                            type="tel"
                            className="form-control"
                            name="storePhone"
                            value={settings.general.storePhone}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Store Address</label>
                          <textarea
                            className="form-control"
                            name="storeAddress"
                            value={settings.general.storeAddress}
                            onChange={handleGeneralSettingsChange}
                            rows="3"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Timezone</label>
                          <select
                            className="form-select"
                            name="timezone"
                            value={settings.general.timezone}
                            onChange={handleGeneralSettingsChange}
                          >
                            <option value="UTC">UTC</option>
                            <option value="UTC+1">UTC+1</option>
                            <option value="UTC+2">UTC+2</option>
                            {/* Add more timezones as needed */}
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Currency</label>
                          <select
                            className="form-select"
                            name="currency"
                            value={settings.general.currency}
                            onChange={handleGeneralSettingsChange}
                          >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            {/* Add more currencies as needed */}
                          </select>
                        </div>
                        <div className="col-12 mb-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="maintenanceMode"
                              checked={settings.general.maintenanceMode}
                              onChange={handleGeneralSettingsChange}
                            />
                            <label className="form-check-label">Maintenance Mode</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Methods Tab */}
                {activeTab === 'payment-methods' && (
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Payment Methods</h5>
                      <button type="button" className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Add Method
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Payment Method</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {settings.paymentMethods.map((method) => (
                            <tr key={method.id}>
                              <td>{method.name}</td>
                              <td>{method.description}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={method.status}
                                    onChange={(e) => handlePaymentMethodChange(method.id, 'status', e.target.checked)}
                                  />
                                  <label className="form-check-label">
                                    {method.status ? 'Enabled' : 'Disabled'}
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button type="button" className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button type="button" className="btn btn-sm btn-outline-danger">
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Shipping Options Tab */}
                {activeTab === 'shipping-options' && (
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Shipping Options</h5>
                      <button type="button" className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Add Option
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Shipping Method</th>
                            <th>Cost</th>
                            <th>Delivery Time</th>
                            <th>Minimum Order</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {settings.shippingOptions.map((option) => (
                            <tr key={option.id}>
                              <td>{option.name}</td>
                              <td>{option.cost}</td>
                              <td>{option.deliveryTime}</td>
                              <td>{option.minOrder || '-'}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={option.status}
                                    onChange={(e) => handleShippingOptionChange(option.id, 'status', e.target.checked)}
                                  />
                                  <label className="form-check-label">
                                    {option.status ? 'Enabled' : 'Disabled'}
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button type="button" className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button type="button" className="btn btn-sm btn-outline-danger">
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Email Templates Tab */}
                {activeTab === 'email-templates' && (
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Email Templates</h5>
                      <button type="button" className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Add Template
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Template Name</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {settings.emailTemplates.map((template) => (
                            <tr key={template.id}>
                              <td>{template.name}</td>
                              <td>{template.subject}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={template.status}
                                    onChange={(e) => handleEmailTemplateChange(template.id, 'status', e.target.checked)}
                                  />
                                  <label className="form-check-label">
                                    {template.status ? 'Enabled' : 'Disabled'}
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button type="button" className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button type="button" className="btn btn-sm btn-outline-danger">
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <button type="submit" className="btn btn-primary">
                    <i className="ri-save-line me-2"></i> Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;