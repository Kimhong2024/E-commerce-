import React from 'react';

function Customer() {
  const handleClick = (e) => {
    e.preventDefault();
    // Add your click handler logic here
  };

  // Sample customer data
  const customers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      orders: 12,
      spent: '$1,245.00',
      joinDate: '2022-03-15',
      status: 'active',
      avatar: 'https://example.com/avatars/1.jpg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543',
      orders: 8,
      spent: '$876.50',
      joinDate: '2022-05-22',
      status: 'active',
      avatar: 'https://example.com/avatars/2.jpg'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+1 (555) 456-7890',
      orders: 5,
      spent: '$542.75',
      joinDate: '2022-07-10',
      status: 'active',
      avatar: 'https://example.com/avatars/3.jpg'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1 (555) 321-6547',
      orders: 3,
      spent: '$267.30',
      joinDate: '2022-09-05',
      status: 'inactive',
      avatar: 'https://example.com/avatars/4.jpg'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      phone: '+1 (555) 654-1238',
      orders: 15,
      spent: '$2,198.00',
      joinDate: '2022-01-18',
      status: 'active',
      avatar: 'https://example.com/avatars/5.jpg'
    }
  ];

  // Sample customer groups
  const groups = [
    { name: 'VIP Customers', customers: 42, discount: '15%', status: 'active' },
    { name: 'Wholesale Buyers', customers: 28, discount: '20%', status: 'active' },
    { name: 'First-time Buyers', customers: 156, discount: '10%', status: 'active' },
    { name: 'Inactive Customers', customers: 87, discount: '0%', status: 'inactive' }
  ];

  // Sample reviews
  const reviews = [
    {
      id: 1,
      product: 'iPhone 13 Pro',
      customer: 'John Smith',
      rating: 5,
      review: 'Excellent product! Fast delivery and great quality.',
      date: '2023-06-15',
      status: 'published'
    },
    {
      id: 2,
      product: 'MacBook Pro M1',
      customer: 'Sarah Johnson',
      rating: 4,
      review: 'Very good laptop, but a bit expensive.',
      date: '2023-06-10',
      status: 'published'
    },
    {
      id: 3,
      product: 'AirPods Pro',
      customer: 'Michael Brown',
      rating: 3,
      review: 'Sound quality is good but battery life could be better.',
      date: '2023-05-28',
      status: 'pending'
    },
    {
      id: 4,
      product: 'iPad Air',
      customer: 'Emily Davis',
      rating: 5,
      review: 'Love this tablet! Perfect for my needs.',
      date: '2023-05-15',
      status: 'published'
    }
  ];

  // Stats cards data
  const stats = [
    { title: 'Total Customers', value: '1,243', icon: 'ri-user-line', trend: 'up', change: '12%' },
    { title: 'Active Customers', value: '1,087', icon: 'ri-user-heart-line', trend: 'up', change: '8%' },
    { title: 'New Customers', value: '156', icon: 'ri-user-add-line', trend: 'down', change: '3%' },
    { title: 'Avg. Orders per Customer', value: '3.2', icon: 'ri-shopping-cart-2-line', trend: 'up', change: '5%' }
  ];

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Sidebar Menu - Same as Home.jsx */}

        {/* Layout container */}
        <div className="layout-page">
            {/* Navbar - Same as Product.jsx */}
          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Customers</h4>
                    <div>
                      <button className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Add Customer
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
                          <i className={`ri-arrow-${stat.trend}-line`} /> {stat.change} vs last month
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
                      <a className="nav-link active" data-bs-toggle="tab" href="#customer-list" role="tab">
                        <i className="ri-list-check me-2"></i> Customer List
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#customer-groups" role="tab">
                        <i className="ri-group-line me-2"></i> Customer Groups
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#reviews" role="tab">
                        <i className="ri-star-smile-line me-2"></i> Reviews & Ratings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Customer List Tab */}
                <div className="tab-pane fade show active" id="customer-list" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Customer List</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                        <div className="me-3">
                          <select className="form-select">
                            <option>Sort by</option>
                            <option>Most Orders</option>
                            <option>Highest Spending</option>
                            <option>Newest</option>
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
                            <th>Customer</th>
                            <th>Contact</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Join Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.map((customer) => (
                            <tr key={customer.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar avatar-sm me-3">
                                    <img src={customer.avatar} alt={customer.name} className="rounded-circle" />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">{customer.name}</h6>
                                    <small className="text-muted">ID: {customer.id}</small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <div>{customer.email}</div>
                                  <small className="text-muted">{customer.phone}</small>
                                </div>
                              </td>
                              <td>{customer.orders}</td>
                              <td>{customer.spent}</td>
                              <td>{customer.joinDate}</td>
                              <td>
                                <span className={`badge bg-${customer.status === 'active' ? 'success' : 'secondary'}`}>
                                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-eye-line"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-secondary">
                                    <i className="ri-mail-line"></i>
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

                {/* Customer Groups Tab */}
                <div className="tab-pane fade" id="customer-groups" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Customer Groups</h5>
                      <button className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Create Group
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Group Name</th>
                            <th>Customers</th>
                            <th>Discount</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groups.map((group, index) => (
                            <tr key={index}>
                              <td>{group.name}</td>
                              <td>{group.customers} customers</td>
                              <td>{group.discount}</td>
                              <td>
                                <span className={`badge bg-${group.status === 'active' ? 'success' : 'secondary'}`}>
                                  {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-secondary me-2">
                                    <i className="ri-group-line"></i> View
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

                {/* Reviews & Ratings Tab */}
                <div className="tab-pane fade" id="reviews" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Product Reviews</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Status</option>
                            <option>Published</option>
                            <option>Pending</option>
                          </select>
                        </div>
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Rating</option>
                            <option>5 Stars</option>
                            <option>4 Stars</option>
                            <option>3 Stars</option>
                            <option>2 Stars</option>
                            <option>1 Star</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Customer</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews.map((review) => (
                            <tr key={review.id}>
                              <td>{review.product}</td>
                              <td>{review.customer}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="rating me-2">
                                    {[...Array(5)].map((_, i) => (
                                      <i 
                                        key={i} 
                                        className={`ri-star-${i < review.rating ? 'fill' : 'line'} text-warning`}
                                      />
                                    ))}
                                  </div>
                                  <span>{review.rating}.0</span>
                                </div>
                              </td>
                              <td>
                                <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                  {review.review}
                                </div>
                              </td>
                              <td>{review.date}</td>
                              <td>
                                <span className={`badge bg-${review.status === 'published' ? 'success' : 'warning'}`}>
                                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  {review.status === 'pending' && (
                                    <button className="btn btn-sm btn-outline-success me-2">
                                      <i className="ri-check-line"></i> Approve
                                    </button>
                                  )}
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
  );
}

export default Customer;