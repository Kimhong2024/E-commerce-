import React from 'react';

function Invoice() {
  const handleClick = (e) => {
    e.preventDefault();
    // Add your click handler logic here
  };

  // Sample invoice data
  const invoices = [
    { 
      id: '#INV-001', 
      customer: 'John Smith', 
      date: '2023-06-15', 
      amount: '$125.00', 
      status: 'paid',
      dueDate: '2023-06-30'
    },
    { 
      id: '#INV-002', 
      customer: 'Sarah Johnson', 
      date: '2023-06-14', 
      amount: '$89.50', 
      status: 'pending',
      dueDate: '2023-06-29'
    },
    { 
      id: '#INV-003', 
      customer: 'Michael Brown', 
      date: '2023-06-14', 
      amount: '$245.75', 
      status: 'paid',
      dueDate: '2023-06-29'
    },
    { 
      id: '#INV-004', 
      customer: 'Emily Davis', 
      date: '2023-06-13', 
      amount: '$67.30', 
      status: 'overdue',
      dueDate: '2023-06-28'
    },
    { 
      id: '#INV-005', 
      customer: 'Robert Wilson', 
      date: '2023-06-12', 
      amount: '$198.00', 
      status: 'paid',
      dueDate: '2023-06-27'
    }
  ];

  // Invoice settings options
  const settings = [
    { name: 'Invoice Prefix', value: 'INV-', editable: true },
    { name: 'Invoice Logo', value: 'logo.png', editable: true, type: 'file' },
    { name: 'Tax Identification Number', value: 'TAX-123456', editable: true },
    { name: 'Invoice Default Terms', value: 'Payment due within 15 days', editable: true, type: 'textarea' },
    { name: 'Invoice Default Notes', value: 'Thank you for your business!', editable: true, type: 'textarea' }
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
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Invoices</h4>
                    <div>
                      <button className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Create Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="row mb-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" data-bs-toggle="tab" href="#download-invoices" role="tab">
                        <i className="ri-download-line me-2"></i> Download Invoices
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#invoice-settings" role="tab">
                        <i className="ri-settings-3-line me-2"></i> Invoice Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Download Invoices Tab */}
                <div className="tab-pane fade show active" id="download-invoices" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Invoice List</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Status</option>
                            <option>Paid</option>
                            <option>Pending</option>
                            <option>Overdue</option>
                          </select>
                        </div>
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Date</option>
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>This Year</option>
                          </select>
                        </div>
                        <button className="btn btn-outline-secondary">
                          <i className="ri-download-2-line"></i> Export
                        </button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Invoice ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.map((invoice, index) => (
                            <tr key={index}>
                              <td>{invoice.id}</td>
                              <td>{invoice.customer}</td>
                              <td>{invoice.date}</td>
                              <td>{invoice.amount}</td>
                              <td>{invoice.dueDate}</td>
                              <td>
                                <span className={`badge bg-${getStatusColor(invoice.status)}`}>
                                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-download-line"></i> Download
                                  </button>
                                  <button className="btn btn-sm btn-outline-secondary">
                                    <i className="ri-printer-line"></i> Print
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <div>
                        Showing 1 to 5 of 25 entries
                      </div>
                      <nav aria-label="Page navigation">
                        <ul className="pagination mb-0">
                          <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">Previous</a>
                          </li>
                          <li className="page-item active"><a className="page-link" href="#">1</a></li>
                          <li className="page-item"><a className="page-link" href="#">2</a></li>
                          <li className="page-item"><a className="page-link" href="#">3</a></li>
                          <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Invoice Settings Tab */}
                <div className="tab-pane fade" id="invoice-settings" role="tabpanel">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Invoice Settings</h5>
                    </div>
                    <div className="card-body">
                      <form>
                        {settings.map((setting, index) => (
                          <div key={index} className="mb-4">
                            <label className="form-label">{setting.name}</label>
                            {setting.type === 'textarea' ? (
                              <textarea 
                                className="form-control" 
                                rows="3"
                                defaultValue={setting.value}
                                disabled={!setting.editable}
                              />
                            ) : setting.type === 'file' ? (
                              <div className="d-flex align-items-center">
                                <input 
                                  type="file" 
                                  className="form-control" 
                                  disabled={!setting.editable}
                                />
                                <span className="ms-3">{setting.value}</span>
                              </div>
                            ) : (
                              <input 
                                type="text" 
                                className="form-control" 
                                defaultValue={setting.value}
                                disabled={!setting.editable}
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
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for status colors
function getStatusColor(status) {
  switch (status) {
    case 'paid':
      return 'success';
    case 'pending':
      return 'warning';
    case 'overdue':
      return 'danger';
    default:
      return 'secondary';
  }
}

export default Invoice;