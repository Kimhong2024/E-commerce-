import React from 'react';

function Order() {
  const handleClick = (e) => {
    e.preventDefault();
    // Add your click handler logic here
  };

  // Sample order data
  const allOrders = [
    { 
      id: '#2456', 
      customer: 'John Smith', 
      date: '2023-06-15', 
      amount: '$125.00', 
      status: 'completed',
      payment: 'paid',
      items: 3
    },
    { 
      id: '#2455', 
      customer: 'Sarah Johnson', 
      date: '2023-06-14', 
      amount: '$89.50', 
      status: 'processing',
      payment: 'paid',
      items: 2
    },
    { 
      id: '#2454', 
      customer: 'Michael Brown', 
      date: '2023-06-14', 
      amount: '$245.75', 
      status: 'completed',
      payment: 'paid',
      items: 5
    },
    { 
      id: '#2453', 
      customer: 'Emily Davis', 
      date: '2023-06-13', 
      amount: '$67.30', 
      status: 'pending',
      payment: 'pending',
      items: 1
    },
    { 
      id: '#2452', 
      customer: 'Robert Wilson', 
      date: '2023-06-12', 
      amount: '$198.00', 
      status: 'completed',
      payment: 'paid',
      items: 4
    }
  ];

  // Sample returns data
  const returns = [
    { 
      id: '#R1001', 
      orderId: '#2456', 
      customer: 'John Smith', 
      date: '2023-06-18', 
      amount: '$125.00', 
      status: 'processing',
      reason: 'Changed mind'
    },
    { 
      id: '#R1002', 
      orderId: '#2449', 
      customer: 'Lisa Taylor', 
      date: '2023-06-17', 
      amount: '$89.99', 
      status: 'completed',
      reason: 'Defective product'
    },
    { 
      id: '#R1003', 
      orderId: '#2442', 
      customer: 'David Wilson', 
      date: '2023-06-15', 
      amount: '$45.50', 
      status: 'pending',
      reason: 'Wrong item received'
    }
  ];

  // Stats cards data
  const stats = [
    { title: 'Total Orders', value: '1,243', icon: 'ri-shopping-cart-2-line', trend: 'up', change: '8%' },
    { title: 'Pending Orders', value: '56', icon: 'ri-time-line', trend: 'down', change: '3%' },
    { title: 'Completed Orders', value: '1,087', icon: 'ri-checkbox-circle-line', trend: 'up', change: '12%' },
    { title: 'Total Revenue', value: '$24,983', icon: 'ri-money-dollar-circle-line', trend: 'up', change: '15%' }
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
                    <h4 className="fw-bold mb-0">Order Management</h4>
                    <div>
                      <button className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Create Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="row mb-4">
                {stats.map((stat, index) => (
                  <div key={index} className="col-md-6 col-lg-3 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="mb-2 text-muted">{stat.title}</h6>
                            <h3 className="mb-0">{stat.value}</h3>
                          </div>
                          <div className={`avatar avatar-sm p-2 bg-label-${stat.trend === 'up' ? 'success' : 'danger'}`}>
                            <i className={`${stat.icon} fs-4 text-${stat.trend === 'up' ? 'success' : 'danger'}`} />
                          </div>
                        </div>
                        <small className={`text-${stat.trend === 'up' ? 'success' : 'danger'}`}>
                          <i className={`ri-arrow-${stat.trend}-line`} /> {stat.change} vs last week
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="row mb-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" data-bs-toggle="tab" href="#all-orders" role="tab">
                        <i className="ri-list-check me-2"></i> All Orders
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#pending-orders" role="tab">
                        <i className="ri-time-line me-2"></i> Pending Orders
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#completed-orders" role="tab">
                        <i className="ri-checkbox-circle-line me-2"></i> Completed Orders
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#returns" role="tab">
                        <i className="ri-arrow-go-back-line me-2"></i> Returns & Refunds
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* All Orders Tab */}
                <div className="tab-pane fade show active" id="all-orders" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">All Orders</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Status</option>
                            <option>Completed</option>
                            <option>Processing</option>
                            <option>Pending</option>
                            <option>Cancelled</option>
                          </select>
                        </div>
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Date</option>
                            <option>Today</option>
                            <option>This Week</option>
                            <option>This Month</option>
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
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allOrders.map((order, index) => (
                            <tr key={index}>
                              <td>{order.id}</td>
                              <td>{order.customer}</td>
                              <td>{order.date}</td>
                              <td>{order.items}</td>
                              <td>{order.amount}</td>
                              <td>
                                <span className={`badge bg-${order.payment === 'paid' ? 'success' : 'warning'}`}>
                                  {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
                                </span>
                              </td>
                              <td>
                                <span className={`badge bg-${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-eye-line"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-secondary">
                                    <i className="ri-printer-line"></i>
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

                {/* Pending Orders Tab */}
                <div className="tab-pane fade" id="pending-orders" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Pending Orders</h5>
                      <button className="btn btn-outline-secondary">
                        <i className="ri-download-2-line"></i> Export
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allOrders.filter(order => order.status === 'pending' || order.status === 'processing').map((order, index) => (
                            <tr key={index}>
                              <td>{order.id}</td>
                              <td>{order.customer}</td>
                              <td>{order.date}</td>
                              <td>{order.amount}</td>
                              <td>
                                <span className={`badge bg-${order.payment === 'paid' ? 'success' : 'warning'}`}>
                                  {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-check-line"></i> Complete
                                  </button>
                                  <button className="btn btn-sm btn-outline-danger">
                                    <i className="ri-close-line"></i> Cancel
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

                {/* Completed Orders Tab */}
                <div className="tab-pane fade" id="completed-orders" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Completed Orders</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Date</option>
                            <option>Today</option>
                            <option>This Week</option>
                            <option>This Month</option>
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
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allOrders.filter(order => order.status === 'completed').map((order, index) => (
                            <tr key={index}>
                              <td>{order.id}</td>
                              <td>{order.customer}</td>
                              <td>{order.date}</td>
                              <td>{order.amount}</td>
                              <td>
                                <span className="badge bg-success">
                                  {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-eye-line"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-secondary">
                                    <i className="ri-printer-line"></i>
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

                {/* Returns & Refunds Tab */}
                <div className="tab-pane fade" id="returns" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Returns & Refunds</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Status</option>
                            <option>Processing</option>
                            <option>Completed</option>
                            <option>Pending</option>
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
                            <th>Return ID</th>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {returns.map((returnItem, index) => (
                            <tr key={index}>
                              <td>{returnItem.id}</td>
                              <td>{returnItem.orderId}</td>
                              <td>{returnItem.customer}</td>
                              <td>{returnItem.date}</td>
                              <td>{returnItem.amount}</td>
                              <td>{returnItem.reason}</td>
                              <td>
                                <span className={`badge bg-${getStatusColor(returnItem.status)}`}>
                                  {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-eye-line"></i>
                                  </button>
                                  {returnItem.status === 'pending' && (
                                    <button className="btn btn-sm btn-outline-success">
                                      <i className="ri-check-line"></i> Approve
                                    </button>
                                  )}
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
  );
}

// Helper function for status colors
function getStatusColor(status) {
  switch (status) {
    case 'completed':
      return 'success';
    case 'processing':
      return 'info';
    case 'pending':
      return 'warning';
    default:
      return 'secondary';
  }
}

export default Order;