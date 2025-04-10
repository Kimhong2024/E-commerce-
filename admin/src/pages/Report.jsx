import React from 'react';

function Report() {
 

  // Sample sales report data
  const salesData = [
    { date: '2023-06-01', orders: 42, revenue: '$4,245.00', avgOrder: '$101.07' },
    { date: '2023-06-02', orders: 38, revenue: '$3,876.50', avgOrder: '$102.01' },
    { date: '2023-06-03', orders: 56, revenue: '$5,542.75', avgOrder: '$98.98' },
    { date: '2023-06-04', orders: 29, revenue: '$2,967.30', avgOrder: '$102.32' },
    { date: '2023-06-05', orders: 63, revenue: '$6,198.00', avgOrder: '$98.38' }
  ];

  // Sample product report data
  const productData = [
    { product: 'iPhone 13 Pro', sold: 142, revenue: '$142,000', returns: 5 },
    { product: 'MacBook Pro M1', sold: 98, revenue: '$127,400', returns: 3 },
    { product: 'AirPods Pro', sold: 87, revenue: '$17,400', returns: 7 },
    { product: 'iPad Air', sold: 65, revenue: '$32,500', returns: 2 },
    { product: 'Galaxy S22 Ultra', sold: 58, revenue: '$69,600', returns: 4 }
  ];

  // Sample customer report data
  const customerData = [
    { customer: 'John Smith', orders: 12, spent: '$1,245.00', lastOrder: '2023-06-15' },
    { customer: 'Sarah Johnson', orders: 8, spent: '$876.50', lastOrder: '2023-06-14' },
    { customer: 'Michael Brown', orders: 5, spent: '$542.75', lastOrder: '2023-06-14' },
    { customer: 'Emily Davis', orders: 3, spent: '$267.30', lastOrder: '2023-06-13' },
    { customer: 'Robert Wilson', orders: 15, spent: '$2,198.00', lastOrder: '2023-06-12' }
  ];

  // Sample inventory report data
  const inventoryData = [
    { product: 'iPhone 13 Pro', sku: 'IP13P-256', stock: 32, value: '$31,968', lowStock: false },
    { product: 'MacBook Pro M1', sku: 'MBP14-M1', stock: 15, value: '$19,485', lowStock: true },
    { product: 'AirPods Pro', sku: 'AP-PRO-2', stock: 45, value: '$11,205', lowStock: false },
    { product: 'iPad Air', sku: 'IPAIR-64', stock: 22, value: '$13,178', lowStock: false },
    { product: 'Galaxy S22 Ultra', sku: 'GS22U-256', stock: 8, value: '$9,592', lowStock: true }
  ];

  // Date range options
  const dateRanges = [
    'Today', 'Yesterday', 'Last 7 Days', 
    'Last 30 Days', 'This Month', 'Last Month', 
    'Custom Range'
  ];

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Sidebar Menu - Same as Home.jsx */}

        {/* Layout container */}
        <div className="layout-page">
          {/* Navbar - Same as Home.jsx */}
         

          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-4">
                <div className="col-12">
                  <h4 className="fw-bold mb-0">Reports</h4>
                </div>
              </div>

              {/* Tabs */}
              <div className="row mb-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" data-bs-toggle="tab" href="#sales-report" role="tab">
                        <i className="ri-line-chart-line me-2"></i> Sales Report
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#product-report" role="tab">
                        <i className="ri-shopping-bag-line me-2"></i> Product Report
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#customer-report" role="tab">
                        <i className="ri-user-line me-2"></i> Customer Report
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#inventory-report" role="tab">
                        <i className="ri-store-2-line me-2"></i> Inventory Report
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Sales Report Tab */}
                <div className="tab-pane fade show active" id="sales-report" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Sales Report</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            {dateRanges.map((range, index) => (
                              <option key={index}>{range}</option>
                            ))}
                          </select>
                        </div>
                        <button className="btn btn-outline-secondary me-3">
                          <i className="ri-download-2-line me-2"></i> Export
                        </button>
                        <button className="btn btn-primary">
                          <i className="ri-printer-line me-2"></i> Print
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row mb-4">
                        <div className="col-lg-8">
                          <div className="chart-container" style={{ height: '300px' }}>
                            {/* Sales chart placeholder */}
                            <div className="bg-light rounded text-center p-5">
                              <p className="mb-0">Sales Chart Placeholder</p>
                              <small className="text-muted">(Chart would display here)</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="row">
                            <div className="col-6 mb-4">
                              <div className="card bg-label-success">
                                <div className="card-body text-center">
                                  <h3 className="mb-1">$24,983</h3>
                                  <small className="text-success">Total Revenue</small>
                                </div>
                              </div>
                            </div>
                            <div className="col-6 mb-4">
                              <div className="card bg-label-primary">
                                <div className="card-body text-center">
                                  <h3 className="mb-1">1,243</h3>
                                  <small className="text-primary">Total Orders</small>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card bg-label-info">
                                <div className="card-body text-center">
                                  <h3 className="mb-1">$89.54</h3>
                                  <small className="text-info">Avg. Order Value</small>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card bg-label-warning">
                                <div className="card-body text-center">
                                  <h3 className="mb-1">342</h3>
                                  <small className="text-warning">New Customers</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Orders</th>
                              <th>Revenue</th>
                              <th>Avg. Order</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {salesData.map((day, index) => (
                              <tr key={index}>
                                <td>{day.date}</td>
                                <td>{day.orders}</td>
                                <td>{day.revenue}</td>
                                <td>{day.avgOrder}</td>
                                <td>
                                  <button className="btn btn-sm btn-outline-primary">
                                    <i className="ri-eye-line"></i> Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Report Tab */}
                <div className="tab-pane fade" id="product-report" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Product Report</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            {dateRanges.map((range, index) => (
                              <option key={index}>{range}</option>
                            ))}
                          </select>
                        </div>
                        <button className="btn btn-outline-secondary me-3">
                          <i className="ri-download-2-line me-2"></i> Export
                        </button>
                        <button className="btn btn-primary">
                          <i className="ri-printer-line me-2"></i> Print
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row mb-4">
                        <div className="col-lg-6">
                          <div className="chart-container" style={{ height: '300px' }}>
                            {/* Top products chart placeholder */}
                            <div className="bg-light rounded text-center p-5">
                              <p className="mb-0">Top Products Chart</p>
                              <small className="text-muted">(Chart would display here)</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="chart-container" style={{ height: '300px' }}>
                            {/* Product categories chart placeholder */}
                            <div className="bg-light rounded text-center p-5">
                              <p className="mb-0">Categories Distribution</p>
                              <small className="text-muted">(Chart would display here)</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Sold</th>
                              <th>Revenue</th>
                              <th>Returns</th>
                              <th>Return Rate</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productData.map((product, index) => (
                              <tr key={index}>
                                <td>{product.product}</td>
                                <td>{product.sold}</td>
                                <td>{product.revenue}</td>
                                <td>{product.returns}</td>
                                <td>{(product.returns / product.sold * 100).toFixed(1)}%</td>
                                <td>
                                  <button className="btn btn-sm btn-outline-primary">
                                    <i className="ri-eye-line"></i> Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Report Tab */}
                <div className="tab-pane fade" id="customer-report" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Customer Report</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            {dateRanges.map((range, index) => (
                              <option key={index}>{range}</option>
                            ))}
                          </select>
                        </div>
                        <button className="btn btn-outline-secondary me-3">
                          <i className="ri-download-2-line me-2"></i> Export
                        </button>
                        <button className="btn btn-primary">
                          <i className="ri-printer-line me-2"></i> Print
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row mb-4">
                        <div className="col-lg-6">
                          <div className="chart-container" style={{ height: '300px' }}>
                            {/* Customer acquisition chart placeholder */}
                            <div className="bg-light rounded text-center p-5">
                              <p className="mb-0">Customer Acquisition</p>
                              <small className="text-muted">(Chart would display here)</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="chart-container" style={{ height: '300px' }}>
                            {/* Customer value chart placeholder */}
                            <div className="bg-light rounded text-center p-5">
                              <p className="mb-0">Customer Value</p>
                              <small className="text-muted">(Chart would display here)</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Customer</th>
                              <th>Orders</th>
                              <th>Total Spent</th>
                              <th>Last Order</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customerData.map((customer, index) => (
                              <tr key={index}>
                                <td>{customer.customer}</td>
                                <td>{customer.orders}</td>
                                <td>{customer.spent}</td>
                                <td>{customer.lastOrder}</td>
                                <td>
                                  <button className="btn btn-sm btn-outline-primary">
                                    <i className="ri-eye-line"></i> Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inventory Report Tab */}
                <div className="tab-pane fade" id="inventory-report" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Inventory Report</h5>
                      <div className="d-flex">
                        <button className="btn btn-outline-secondary me-3">
                          <i className="ri-download-2-line me-2"></i> Export
                        </button>
                        <button className="btn btn-primary">
                          <i className="ri-printer-line me-2"></i> Print
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row mb-4">
                        <div className="col-lg-6">
                          <div className="chart-container" style={{ height: '300px' }}>
                            {/* Inventory value chart placeholder */}
                            <div className="bg-light rounded text-center p-5">
                              <p className="mb-0">Inventory Value</p>
                              <small className="text-muted">(Chart would display here)</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="chart-container" style={{ height: '300px' }}>
                            {/* Stock status chart placeholder */}
                            <div className="bg-light rounded text-center p-5">
                              <p className="mb-0">Stock Status</p>
                              <small className="text-muted">(Chart would display here)</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>SKU</th>
                              <th>Stock</th>
                              <th>Value</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inventoryData.map((item, index) => (
                              <tr key={index}>
                                <td>{item.product}</td>
                                <td>{item.sku}</td>
                                <td>{item.stock}</td>
                                <td>{item.value}</td>
                                <td>
                                  <span className={`badge bg-${item.lowStock ? 'warning' : 'success'}`}>
                                    {item.lowStock ? 'Low Stock' : 'In Stock'}
                                  </span>
                                </td>
                                <td>
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-add-line me-1"></i> Restock
                                  </button>
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
  );
}

export default Report;