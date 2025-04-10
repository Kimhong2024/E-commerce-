import React from 'react';

function Optional() {
 

  // Sample messages data
  const messages = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john@example.com', 
      subject: 'Product Inquiry', 
      message: 'I have a question about your product specifications...', 
      date: '2023-06-15', 
      status: 'unread' 
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com', 
      subject: 'Order Issue', 
      message: 'My order #2455 hasn\'t arrived yet...', 
      date: '2023-06-14', 
      status: 'read' 
    },
    { 
      id: 3, 
      name: 'Michael Brown', 
      email: 'michael@example.com', 
      subject: 'Partnership', 
      message: 'I\'d like to discuss a potential partnership...', 
      date: '2023-06-14', 
      status: 'read' 
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      email: 'emily@example.com', 
      subject: 'Return Request', 
      message: 'I need to return item #IP13P-256...', 
      date: '2023-06-13', 
      status: 'unread' 
    }
  ];

  // Sample blog posts
  const blogPosts = [
    { 
      id: 1, 
      title: 'New Product Launch', 
      category: 'News', 
      author: 'Admin', 
      date: '2023-06-10', 
      status: 'published', 
      views: 142 
    },
    { 
      id: 2, 
      title: 'Summer Sale Guide', 
      category: 'Promotions', 
      author: 'Marketing', 
      date: '2023-06-05', 
      status: 'published', 
      views: 98 
    },
    { 
      id: 3, 
      title: 'Product Comparison', 
      category: 'Guides', 
      author: 'Tech Team', 
      date: '2023-05-28', 
      status: 'draft', 
      views: 0 
    },
    { 
      id: 4, 
      title: 'Company Updates', 
      category: 'News', 
      author: 'Admin', 
      date: '2023-05-20', 
      status: 'published', 
      views: 87 
    }
  ];

  // Sample FAQs
  const faqs = [
    { 
      id: 1, 
      question: 'How long does shipping take?', 
      answer: 'Standard shipping takes 3-5 business days...', 
      category: 'Shipping', 
      status: 'active' 
    },
    { 
      id: 2, 
      question: 'What payment methods do you accept?', 
      answer: 'We accept Visa, Mastercard, PayPal...', 
      category: 'Payments', 
      status: 'active' 
    },
    { 
      id: 3, 
      question: 'How can I return an item?', 
      answer: 'You can initiate a return from your account...', 
      category: 'Returns', 
      status: 'active' 
    },
    { 
      id: 4, 
      question: 'Do you offer international shipping?', 
      answer: 'Yes, we ship to most countries worldwide...', 
      category: 'Shipping', 
      status: 'inactive' 
    }
  ];

  // Sample system logs
  const systemLogs = [
    { 
      id: 1, 
      type: 'login', 
      user: 'admin@example.com', 
      ip: '192.168.1.1', 
      description: 'User logged in successfully', 
      date: '2023-06-15 14:30:22' 
    },
    { 
      id: 2, 
      type: 'order', 
      user: 'customer@example.com', 
      ip: '45.23.156.89', 
      description: 'Order #2456 placed', 
      date: '2023-06-15 12:15:07' 
    },
    { 
      id: 3, 
      type: 'error', 
      user: 'system', 
      ip: '127.0.0.1', 
      description: 'Database connection timeout', 
      date: '2023-06-15 08:45:33' 
    },
    { 
      id: 4, 
      type: 'update', 
      user: 'manager@example.com', 
      ip: '192.168.1.5', 
      description: 'Product #142 updated', 
      date: '2023-06-14 16:20:18' 
    }
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
                  <h4 className="fw-bold mb-0">Optional</h4>
                </div>
              </div>

              {/* Tabs */}
              <div className="row mb-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" data-bs-toggle="tab" href="#messages" role="tab">
                        <i className="ri-mail-line me-2"></i> Messages / Contact
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#blog" role="tab">
                        <i className="ri-article-line me-2"></i> Blog / Posts
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#faq" role="tab">
                        <i className="ri-question-line me-2"></i> FAQ Management
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#logs" role="tab">
                        <i className="ri-file-list-2-line me-2"></i> System Logs
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Messages / Contact Tab */}
                <div className="tab-pane fade show active" id="messages" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Customer Messages</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Status</option>
                            <option>Unread</option>
                            <option>Read</option>
                            <option>Replied</option>
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
                            <th>From</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {messages.map((msg) => (
                            <tr key={msg.id} className={msg.status === 'unread' ? 'table-primary' : ''}>
                              <td>
                                <div>
                                  <div>{msg.name}</div>
                                  <small className="text-muted">{msg.email}</small>
                                </div>
                              </td>
                              <td>{msg.subject}</td>
                              <td>
                                <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                  {msg.message}
                                </div>
                              </td>
                              <td>{msg.date}</td>
                              <td>
                                <span className={`badge bg-${msg.status === 'unread' ? 'warning' : 'success'}`}>
                                  {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-eye-line"></i> View
                                  </button>
                                  <button className="btn btn-sm btn-outline-success">
                                    <i className="ri-reply-line"></i> Reply
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
                        Showing 1 to 4 of 24 messages
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

                {/* Blog / Posts Tab */}
                <div className="tab-pane fade" id="blog" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Blog Posts</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Category</option>
                            <option>News</option>
                            <option>Promotions</option>
                            <option>Guides</option>
                          </select>
                        </div>
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Status</option>
                            <option>Published</option>
                            <option>Draft</option>
                          </select>
                        </div>
                        <button className="btn btn-primary">
                          <i className="ri-add-line me-2"></i> New Post
                        </button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Views</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogPosts.map((post) => (
                            <tr key={post.id}>
                              <td>{post.title}</td>
                              <td>
                                <span className="badge bg-label-primary">{post.category}</span>
                              </td>
                              <td>{post.author}</td>
                              <td>{post.date}</td>
                              <td>{post.views}</td>
                              <td>
                                <span className={`badge bg-${post.status === 'published' ? 'success' : 'secondary'}`}>
                                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-sm btn-outline-primary me-2">
                                    <i className="ri-edit-line"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-secondary me-2">
                                    <i className="ri-eye-line"></i>
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

                {/* FAQ Management Tab */}
                <div className="tab-pane fade" id="faq" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Frequently Asked Questions</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Category</option>
                            <option>Shipping</option>
                            <option>Payments</option>
                            <option>Returns</option>
                          </select>
                        </div>
                        <button className="btn btn-primary">
                          <i className="ri-add-line me-2"></i> Add FAQ
                        </button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faqs.map((faq) => (
                            <tr key={faq.id}>
                              <td>{faq.question}</td>
                              <td>
                                <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                  {faq.answer}
                                </div>
                              </td>
                              <td>
                                <span className="badge bg-label-info">{faq.category}</span>
                              </td>
                              <td>
                                <div className="form-check form-switch">
                                  <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id={`faq-${faq.id}`}
                                    defaultChecked={faq.status === 'active'}
                                  />
                                  <label className="form-check-label" htmlFor={`faq-${faq.id}`}>
                                    {faq.status === 'active' ? 'Active' : 'Inactive'}
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

                {/* System Logs Tab */}
                <div className="tab-pane fade" id="logs" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">System Logs</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Type</option>
                            <option>All</option>
                            <option>Login</option>
                            <option>Order</option>
                            <option>Error</option>
                            <option>Update</option>
                          </select>
                        </div>
                        <button className="btn btn-outline-secondary">
                          <i className="ri-download-2-line"></i> Export Logs
                        </button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>User</th>
                            <th>IP Address</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {systemLogs.map((log) => (
                            <tr key={log.id}>
                              <td>
                                <span className={`badge bg-${getLogTypeColor(log.type)}`}>
                                  {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                                </span>
                              </td>
                              <td>{log.user}</td>
                              <td>{log.ip}</td>
                              <td>
                                <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                  {log.description}
                                </div>
                              </td>
                              <td>{log.date}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  <i className="ri-information-line"></i> Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <div>
                        Showing 1 to 4 of 124 logs
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
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for log type colors
function getLogTypeColor(type) {
  switch (type) {
    case 'login':
      return 'primary';
    case 'order':
      return 'success';
    case 'error':
      return 'danger';
    case 'update':
      return 'info';
    default:
      return 'secondary';
  }
}

export default Optional;