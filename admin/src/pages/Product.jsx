import React from 'react';

function Product() {
  const handleClick = (e) => {
    e.preventDefault();
    // Add your click handler logic here
  };

  // Sample product data
  const products = [
    { 
      id: 1, 
      name: 'iPhone 13 Pro', 
      category: 'Smartphones', 
      brand: 'Apple', 
      price: '$999', 
      stock: 32, 
      status: 'published',
      image: 'https://example.com/iphone13.jpg'
    },
    { 
      id: 2, 
      name: 'MacBook Pro M1', 
      category: 'Laptops', 
      brand: 'Apple', 
      price: '$1299', 
      stock: 15, 
      status: 'published',
      image: 'https://example.com/macbook.jpg'
    },
    { 
      id: 3, 
      name: 'AirPods Pro', 
      category: 'Audio', 
      brand: 'Apple', 
      price: '$249', 
      stock: 45, 
      status: 'published',
      image: 'https://example.com/airpods.jpg'
    },
    { 
      id: 4, 
      name: 'iPad Air', 
      category: 'Tablets', 
      brand: 'Apple', 
      price: '$599', 
      stock: 22, 
      status: 'draft',
      image: 'https://example.com/ipad.jpg'
    },
    { 
      id: 5, 
      name: 'Galaxy S22 Ultra', 
      category: 'Smartphones', 
      brand: 'Samsung', 
      price: '$1199', 
      stock: 28, 
      status: 'published',
      image: 'https://example.com/galaxy.jpg'
    }
  ];

  // Sample categories
  const categories = [
    { name: 'Smartphones', products: 142, status: 'active' },
    { name: 'Laptops', products: 98, status: 'active' },
    { name: 'Audio', products: 87, status: 'active' },
    { name: 'Tablets', products: 65, status: 'active' },
    { name: 'Wearables', products: 42, status: 'active' }
  ];

  // Sample brands
  const brands = [
    { name: 'Apple', products: 342, status: 'active' },
    { name: 'Samsung', products: 243, status: 'active' },
    { name: 'Sony', products: 187, status: 'active' },
    { name: 'Microsoft', products: 132, status: 'active' },
    { name: 'Google', products: 98, status: 'active' }
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
                    <h4 className="fw-bold mb-0">Product Management</h4>
                    <div>
                      <button className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Add Product
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
                      <a className="nav-link active" data-bs-toggle="tab" href="#all-products" role="tab">
                        <i className="ri-list-check me-2"></i> All Products
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#categories" role="tab">
                        <i className="ri-folder-2-line me-2"></i> Categories
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#brands" role="tab">
                        <i className="ri-price-tag-3-line me-2"></i> Brands
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#inventory" role="tab">
                        <i className="ri-store-2-line me-2"></i> Stock / Inventory
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* All Products Tab */}
                <div className="tab-pane fade show active" id="all-products" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">All Products</h5>
                      <div className="d-flex">
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Category</option>
                            <option>Smartphones</option>
                            <option>Laptops</option>
                            <option>Audio</option>
                            <option>Tablets</option>
                          </select>
                        </div>
                        <div className="me-3">
                          <select className="form-select">
                            <option>Filter by Status</option>
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Archived</option>
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
                            <th>Product</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar avatar-sm me-3">
                                    <img src={product.image} alt={product.name} className="rounded" />
                                  </div>
                                  <div>
                                    <h6 className="mb-0">{product.name}</h6>
                                    <small className="text-muted">ID: {product.id}</small>
                                  </div>
                                </div>
                              </td>
                              <td>{product.category}</td>
                              <td>{product.brand}</td>
                              <td>{product.price}</td>
                              <td>
                                <span className={`badge bg-${product.stock > 20 ? 'success' : product.stock > 5 ? 'warning' : 'danger'}`}>
                                  {product.stock} in stock
                                </span>
                              </td>
                              <td>
                                <span className={`badge bg-${product.status === 'published' ? 'success' : 'secondary'}`}>
                                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                </span>
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

                {/* Categories Tab */}
                <div className="tab-pane fade" id="categories" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Categories</h5>
                      <button className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Add Category
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Category Name</th>
                            <th>Products</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((category, index) => (
                            <tr key={index}>
                              <td>{category.name}</td>
                              <td>{category.products} products</td>
                              <td>
                                <span className="badge bg-success">Active</span>
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

                {/* Brands Tab */}
                <div className="tab-pane fade" id="brands" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Brands</h5>
                      <button className="btn btn-primary">
                        <i className="ri-add-line me-2"></i> Add Brand
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Brand Name</th>
                            <th>Products</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {brands.map((brand, index) => (
                            <tr key={index}>
                              <td>{brand.name}</td>
                              <td>{brand.products} products</td>
                              <td>
                                <span className="badge bg-success">Active</span>
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

                {/* Inventory Tab */}
                <div className="tab-pane fade" id="inventory" role="tabpanel">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Low Stock Products</h5>
                          <button className="btn btn-outline-secondary">
                            <i className="ri-download-2-line me-2"></i> Export
                          </button>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Current Stock</th>
                                <th>Reorder Level</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products.filter(p => p.stock < 25).map((product) => (
                                <tr key={product.id}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar avatar-sm me-3">
                                        <img src={product.image} alt={product.name} className="rounded" />
                                      </div>
                                      <div>
                                        <h6 className="mb-0">{product.name}</h6>
                                        <small className="text-muted">{product.brand}</small>
                                      </div>
                                    </div>
                                  </td>
                                  <td>SKU-{product.id.toString().padStart(4, '0')}</td>
                                  <td>
                                    <span className={`badge bg-${product.stock > 10 ? 'warning' : 'danger'}`}>
                                      {product.stock} in stock
                                    </span>
                                  </td>
                                  <td>25</td>
                                  <td>
                                    <button className="btn btn-sm btn-outline-primary">
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
                    <div className="col-lg-4">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="mb-0">Inventory Summary</h5>
                        </div>
                        <div className="card-body">
                          <div className="mb-4">
                            <h6>Total Products</h6>
                            <h3 className="mb-0">1,243</h3>
                          </div>
                          <div className="mb-4">
                            <h6>Out of Stock</h6>
                            <h3 className="mb-0">12</h3>
                          </div>
                          <div className="mb-4">
                            <h6>Low Stock </h6>
                            <h3 className="mb-0">45</h3>
                          </div>
                          <div>
                            <h6>Inventory Value</h6>
                            <h3 className="mb-0">$245,983</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Same as Home.jsx */}
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

export default Product;