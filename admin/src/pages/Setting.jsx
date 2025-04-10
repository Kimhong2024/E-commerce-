import React from 'react';

function Setting() {
 
  // Sample payment methods
  const paymentMethods = [
    { id: 1, name: 'Credit Card', status: true, description: 'Visa, Mastercard, American Express' },
    { id: 2, name: 'PayPal', status: true, description: 'Pay with PayPal account' },
    { id: 3, name: 'Bank Transfer', status: false, description: 'Direct bank transfer' },
    { id: 4, name: 'Cash on Delivery', status: true, description: 'Pay when you receive the product' }
  ];

  // Sample shipping options
  const shippingOptions = [
    { id: 1, name: 'Standard Shipping', cost: '$5.99', deliveryTime: '3-5 business days', status: true },
    { id: 2, name: 'Express Shipping', cost: '$12.99', deliveryTime: '1-2 business days', status: true },
    { id: 3, name: 'Free Shipping', cost: 'Free', deliveryTime: '5-7 business days', status: true, minOrder: '$50.00' },
    { id: 4, name: 'Local Pickup', cost: 'Free', deliveryTime: 'Same day', status: false }
  ];

  // Sample email templates
  const emailTemplates = [
    { id: 1, name: 'Order Confirmation', subject: 'Your Order #{order_id} has been received', status: true },
    { id: 2, name: 'Shipping Notification', subject: 'Your Order #{order_id} has been shipped', status: true },
    { id: 3, name: 'Payment Received', subject: 'Payment received for Order #{order_id}', status: false },
    { id: 4, name: 'Password Reset', subject: 'Password reset instructions', status: true }
  ];

  // Sample admin users
  const adminUsers = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Super Admin', lastLogin: '2023-06-15 14:30' },
    { id: 2, name: 'Manager', email: 'manager@example.com', role: 'Content Manager', lastLogin: '2023-06-14 10:15' },
    { id: 3, name: 'Sales', email: 'sales@example.com', role: 'Sales Manager', lastLogin: '2023-06-12 09:45' },
    { id: 4, name: 'Support', email: 'support@example.com', role: 'Customer Support', lastLogin: '2023-06-10 16:20' }
  ];

  // Sample roles
  const roles = [
    { id: 1, name: 'Super Admin', permissions: 'Full access', users: 1 },
    { id: 2, name: 'Content Manager', permissions: 'Products, Categories, Blog', users: 2 },
    { id: 3, name: 'Sales Manager', permissions: 'Orders, Customers, Reports', users: 3 },
    { id: 4, name: 'Customer Support', permissions: 'Orders, Customers, Tickets', users: 5 }
  ];

  // General settings
  const generalSettings = [
    { name: 'Store Name', value: 'My Awesome Store', type: 'text' },
    { name: 'Store Email', value: 'contact@example.com', type: 'email' },
    { name: 'Store Phone', value: '+1 (555) 123-4567', type: 'tel' },
    { name: 'Store Address', value: '123 Main St, City, Country', type: 'textarea' },
    { name: 'Store Logo', value: 'logo.png', type: 'file' },
    { name: 'Timezone', value: 'UTC-05:00 (Eastern Time)', type: 'select' },
    { name: 'Currency', value: 'USD - US Dollar', type: 'select' },
    { name: 'Maintenance Mode', value: false, type: 'checkbox' }
  ];

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
                  <h4 className="fw-bold mb-0">Settings</h4>
                </div>
              </div>

              {/* Tabs */}
              <div className="row mb-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" data-bs-toggle="tab" href="#general-settings" role="tab">
                        <i className="ri-settings-3-line me-2"></i> General Settings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#payment-methods" role="tab">
                        <i className="ri-bank-card-line me-2"></i> Payment Methods
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#shipping-options" role="tab">
                        <i className="ri-truck-line me-2"></i> Shipping Options
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#email-templates" role="tab">
                        <i className="ri-mail-line me-2"></i> Email Templates
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#admin-users" role="tab">
                        <i className="ri-user-settings-line me-2"></i> Admin Users / Roles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* General Settings Tab */}
                <div className="tab-pane fade show active" id="general-settings" role="tabpanel">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">General Settings</h5>
                    </div>
                    <div className="card-body">
                      <form>
                        {generalSettings.map((setting, index) => (
                          <div key={index} className="mb-4">
                            <label className="form-label">{setting.name}</label>
                            {setting.type === 'textarea' ? (
                              <textarea 
                                className="form-control" 
                                rows="3"
                                defaultValue={setting.value}
                              />
                            ) : setting.type === 'file' ? (
                              <div className="d-flex align-items-center">
                                <input 
                                  type="file" 
                                  className="form-control" 
                                />
                                <span className="ms-3">{setting.value}</span>
                              </div>
                            ) : setting.type === 'select' ? (
                              <select className="form-select">
                                <option>{setting.value}</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                              </select>
                            ) : setting.type === 'checkbox' ? (
                              <div className="form-check form-switch">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox" 
                                  id={`setting-${index}`}
                                  defaultChecked={setting.value}
                                />
                                <label className="form-check-label" htmlFor={`setting-${index}`}>
                                  {setting.value ? 'Enabled' : 'Disabled'}
                                </label>
                              </div>
                            ) : (
                              <input 
                                type={setting.type} 
                                className="form-control" 
                                defaultValue={setting.value}
                              />
                            )}
                          </div>
                        ))}
                        <div className="mt-4">
                          <button type="submit" className="btn btn-primary">
                            <i className="ri-save-line me-2"></i> Save Settings
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Payment Methods Tab */}
                <div className="tab-pane fade" id="payment-methods" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Payment Methods</h5>
                      <button className="btn btn-primary">
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
                          {paymentMethods.map((method) => (
                            <tr key={method.id}>
                              <td>{method.name}</td>
                              <td>{method.description}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id={`payment-${method.id}`}
                                    defaultChecked={method.status}
                                  />
                                  <label className="form-check-label" htmlFor={`payment-${method.id}`}>
                                    {method.status ? 'Enabled' : 'Disabled'}
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-danger">
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
                </div>

                {/* Shipping Options Tab */}
                <div className="tab-pane fade" id="shipping-options" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Shipping Options</h5>
                      <button className="btn btn-primary">
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
                          {shippingOptions.map((option) => (
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
                                    id={`shipping-${option.id}`}
                                    defaultChecked={option.status}
                                  />
                                  <label className="form-check-label" htmlFor={`shipping-${option.id}`}>
                                    {option.status ? 'Enabled' : 'Disabled'}
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-danger">
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
                </div>

                {/* Email Templates Tab */}
                <div className="tab-pane fade" id="email-templates" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Email Templates</h5>
                      <button className="btn btn-primary">
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
                          {emailTemplates.map((template) => (
                            <tr key={template.id}>
                              <td>{template.name}</td>
                              <td>{template.subject}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id={`email-${template.id}`}
                                    defaultChecked={template.status}
                                  />
                                  <label className="form-check-label" htmlFor={`email-${template.id}`}>
                                    {template.status ? 'Active' : 'Inactive'}
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-edit-line"></i> Edit
                                  </button>
                                  <button className="btn btn-sm btn-outline-secondary">
                                    <i className="ri-eye-line"></i> Preview
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Admin Users / Roles Tab */}
                <div className="tab-pane fade" id="admin-users" role="tabpanel">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Admin Users</h5>
                          <button className="btn btn-primary">
                            <i className="ri-user-add-line me-2"></i> Add User
                          </button>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Last Login</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {adminUsers.map((user) => (
                                <tr key={user.id}>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>{user.role}</td>
                                  <td>{user.lastLogin}</td>
                                  <td>
                                    <div className="d-flex">
                                      <button className="btn btn-sm btn-outline-primary me-2">
                                        <i className="ri-edit-line"></i>
                                      </button>
                                      <button className="btn btn-sm btn-outline-danger">
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
                    </div>
                    <div className="col-lg-4">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Roles & Permissions</h5>
                          <button className="btn btn-primary">
                            <i className="ri-add-line me-2"></i> Add Role
                          </button>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Role</th>
                                <th>Permissions</th>
                                <th>Users</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {roles.map((role) => (
                                <tr key={role.id}>
                                  <td>{role.name}</td>
                                  <td>
                                    <div className="text-truncate" style={{ maxWidth: '150px' }}>
                                      {role.permissions}
                                    </div>
                                  </td>
                                  <td>{role.users}</td>
                                  <td>
                                    <div className="d-flex">
                                      <button className="btn btn-sm btn-outline-primary me-2">
                                        <i className="ri-edit-line"></i>
                                      </button>
                                      <button className="btn btn-sm btn-outline-danger">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;