import React from 'react';

function Home() {
  const handleClick = (e) => {
    e.preventDefault();
    // Add your click handler logic here
  };

  // Sample data
  const stats = [
    { title: 'Total Revenue', value: '$24,983', icon: 'ri-money-dollar-circle-line', trend: 'up', change: '12%' },
    { title: 'Total Orders', value: '1,243', icon: 'ri-shopping-cart-2-line', trend: 'up', change: '8%' },
    { title: 'New Customers', value: '342', icon: 'ri-user-add-line', trend: 'down', change: '3%' },
    { title: 'Avg. Order Value', value: '$89.54', icon: 'ri-line-chart-line', trend: 'up', change: '5%' }
  ];

  const recentOrders = [
    { id: '#2456', customer: 'John Smith', date: '2023-06-15', amount: '$125.00', status: 'completed' },
    { id: '#2455', customer: 'Sarah Johnson', date: '2023-06-14', amount: '$89.50', status: 'processing' },
    { id: '#2454', customer: 'Michael Brown', date: '2023-06-14', amount: '$245.75', status: 'completed' },
    { id: '#2453', customer: 'Emily Davis', date: '2023-06-13', amount: '$67.30', status: 'pending' },
    { id: '#2452', customer: 'Robert Wilson', date: '2023-06-12', amount: '$198.00', status: 'completed' }
  ];

  const topProducts = [
    { name: 'iPhone 13 Pro', sales: 142, revenue: '$142,000', stock: 32 },
    { name: 'MacBook Pro M1', sales: 98, revenue: '$127,400', stock: 15 },
    { name: 'AirPods Pro', sales: 87, revenue: '$17,400', stock: 45 },
    { name: 'iPad Air', sales: 65, revenue: '$32,500', stock: 22 }
  ];

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Sidebar Menu - Same as Product.jsx */}

        {/* Layout container */}
        <div className="layout-page">

          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold mb-4">Dashboard</h4>

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

              {/* Charts Row */}
              <div className="row mb-4">
                {/* Revenue Chart */}
                <div className="col-lg-8 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Revenue Overview</h5>
                      <div className="dropdown">
                        <button className="btn p-0" type="button" data-bs-toggle="dropdown">
                          <i className="ri-more-2-line" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li><a className="dropdown-item" href="#">Last 7 Days</a></li>
                          <li><a className="dropdown-item" href="#">Last Month</a></li>
                          <li><a className="dropdown-item" href="#">Last Year</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="chart-container" style={{ height: '300px' }}>
                        {/* Replace with your actual chart component */}
                        <div className="bg-light rounded text-center p-5">
                          <p className="mb-0">Revenue Chart Placeholder</p>
                          <small className="text-muted">(Chart would display here)</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sales Chart */}
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Sales Distribution</h5>
                    </div>
                    <div className="card-body">
                      <div className="chart-container" style={{ height: '300px' }}>
                        {/* Replace with your actual chart component */}
                        <div className="bg-light rounded text-center p-5">
                          <p className="mb-0">Sales Chart Placeholder</p>
                          <small className="text-muted">(Chart would display here)</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders & Top Products */}
              <div className="row">
                {/* Recent Orders */}
                <div className="col-lg-8 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Recent Orders</h5>
                      <a href="#" className="btn btn-sm btn-outline-primary" onClick={handleClick}>View All</a>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order, index) => (
                            <tr key={index}>
                              <td>{order.id}</td>
                              <td>{order.customer}</td>
                              <td>{order.date}</td>
                              <td>{order.amount}</td>
                              <td>
                                <span className={`badge bg-${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="ri-eye-line" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Top Products */}
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Top Products</h5>
                      <a href="#" className="btn btn-sm btn-outline-primary" onClick={handleClick}>View All</a>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        {topProducts.map((product, index) => (
                          <li key={index} className="mb-3">
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-sm me-3">
                                <span className="avatar-initial rounded bg-label-primary">
                                  {product.name.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-0">{product.name}</h6>
                                <small className="text-muted">{product.sales} sales | ${product.revenue}</small>
                              </div>
                              <span className={`badge bg-label-${product.stock > 20 ? 'success' : 'warning'}`}>
                                {product.stock} in stock
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Same as Product.jsx */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl">
                <div className="footer-container d-flex align-items-center justify-content-between py-3 flex-md-row flex-column">
                  <div className="mb-2 mb-md-0">
                    © {new Date().getFullYear()}, made with <span className="text-danger">❤️</span> by Your Company
                  </div>
                  <div>
                    <a href="#" className="footer-link me-4" onClick={handleClick}>License</a>
                    <a href="#" className="footer-link me-4" onClick={handleClick}>Help</a>
                  </div>
                </div>
              </div>
            </footer>
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

export default Home;