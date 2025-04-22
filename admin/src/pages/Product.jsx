import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    brand: '',
    status: 'draft',
    is_active: true,
    image: null
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term
    const filtered = products.filter(product => {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.price.toString().includes(searchLower) ||
        product.stock.toString().includes(searchLower)
      );
    });
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('is_active', formData.is_active ? '1' : '0');
      
      // Add image if exists
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingProduct) {
        await axios.put(`/products/${editingProduct.id}`, formDataToSend, config);
        toast.success('Product updated successfully');
      } else {
        await axios.post('/products', formDataToSend, config);
        toast.success('Product created successfully');
      }

      setShowModal(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        brand: '',
        status: 'draft',
        is_active: true,
        image: null
      });
      fetchProducts();
    } catch (error) {
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        setErrors(validationErrors);
        
        // Log validation errors for debugging
        console.log('Validation errors:', validationErrors);
        
        // Show specific error messages
        Object.keys(validationErrors).forEach(field => {
          toast.error(`${field}: ${validationErrors[field][0]}`);
        });
      } else {
        toast.error(error.response?.data?.message || 'Operation failed');
        console.error('Error submitting product:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      brand: product.brand,
      status: product.status,
      is_active: product.is_active,
      image: null
    });
    setShowModal(true);
  };

  const handleToggleActive = async (id) => {
    try {
      await axios.patch(`/products/${id}/toggle-active`);
      toast.success('Product status updated successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product status');
      console.error('Error toggling product status:', error);
    }
  };

  // Add this new function to handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

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
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="ri-add-line me-2"></i> Add Product
                    </button>
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
                  </ul>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* All Products Tab */}
                <div className="tab-pane fade show active" id="all-products" role="tabpanel">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Product List</h5>
                      <div className="d-flex gap-2">
                        <div className="input-group input-group-sm" style={{ width: '300px' }}>
                          <span className="input-group-text bg-transparent">
                            <i className="ri-search-line"></i>
                          </span>
                          <input 
                            type="text" 
                            className="form-control border-start-0" 
                            placeholder="Search products by name, category, brand, price..."
                            value={searchTerm}
                            onChange={handleSearch}
                          />
                          {searchTerm && (
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => setSearchTerm('')}
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th style={{ width: '30%' }}>Product</th>
                            <th style={{ width: '15%' }}>Category</th>
                            <th style={{ width: '15%' }}>Brand</th>
                            <th style={{ width: '10%' }}>Price</th>
                            <th style={{ width: '10%' }}>Stock</th>
                            <th style={{ width: '10%' }}>Status</th>
                            <th style={{ width: '10%' }}>Actions</th>
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
                          ) : filteredProducts.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="text-center py-4">
                                <div className="d-flex flex-column align-items-center">
                                  <i className="ri-search-line fs-1 text-muted mb-2"></i>
                                  <p className="text-muted mb-0">No products found</p>
                                  {searchTerm && (
                                    <small className="text-muted">Try adjusting your search</small>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ) : (
                            filteredProducts.map((product) => (
                              <tr key={product.id} className="product-row">
                                <td>
                                  <div className="d-flex align-items-center">
                                    {product.image ? (
                                      <div className="avatar avatar-lg me-3">
                                        <img 
                                          src={`http://localhost:8000/storage/${product.image}`} 
                                          alt={product.name} 
                                          className="rounded-3"
                                          style={{ 
                                            width: '60px', 
                                            height: '60px', 
                                            objectFit: 'cover',
                                            backgroundColor: '#f8f9fa'
                                          }}
                                          onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                                            e.target.onerror = null;
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <div 
                                        className="avatar avatar-lg me-3 bg-light rounded-3 d-flex align-items-center justify-content-center"
                                        style={{ width: '60px', height: '60px' }}
                                      >
                                        <i className="ri-image-line fs-4 text-muted"></i>
                                      </div>
                                    )}
                                    <div>
                                      <h6 className="mb-1 fw-semibold">{product.name}</h6>
                                      <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>
                                        {product.description}
                                      </small>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge bg-label-primary">
                                    {product.category}
                                  </span>
                                </td>
                                <td>
                                  <span className="badge bg-label-info">
                                    {product.brand}
                                  </span>
                                </td>
                                <td>
                                  <span className="fw-semibold">${product.price}</span>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="progress flex-grow-1" style={{ height: '6px', width: '60px' }}>
                                      <div 
                                        className={`progress-bar ${
                                          product.stock > 20 ? 'bg-success' : 
                                          product.stock > 5 ? 'bg-warning' : 'bg-danger'
                                        }`} 
                                        role="progressbar" 
                                        style={{ 
                                          width: `${Math.min(100, (product.stock / 50) * 100)}%` 
                                        }}
                                      />
                                    </div>
                                    <span className="ms-2">{product.stock}</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={product.is_active}
                                      onChange={() => handleToggleActive(product.id)}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button 
                                      className="btn btn-sm btn-icon btn-outline-primary"
                                      onClick={() => handleEdit(product)}
                                      title="Edit"
                                    >
                                      <i className="ri-edit-line" />
                                    </button>
                                    <button 
                                      className="btn btn-sm btn-icon btn-outline-danger"
                                      onClick={() => handleDelete(product.id)}
                                      title="Delete"
                                    >
                                      <i className="ri-delete-bin-line" />
                                    </button>
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
                        Showing <span className="fw-semibold">{filteredProducts.length}</span> of <span className="fw-semibold">{products.length}</span> products
                      </div>
                      <nav aria-label="Page navigation">
                        <ul className="pagination pagination-sm mb-0">
                          <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">
                              <i className="ri-arrow-left-s-line"></i>
                            </a>
                          </li>
                          <li className="page-item active"><a className="page-link" href="#">1</a></li>
                          <li className="page-item"><a className="page-link" href="#">2</a></li>
                          <li className="page-item"><a className="page-link" href="#">3</a></li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              <i className="ri-arrow-right-s-line"></i>
                            </a>
                          </li>
                        </ul>
                      </nav>
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

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: '',
                      stock: '',
                      category: '',
                      brand: '',
                      status: 'draft',
                      is_active: true,
                      image: null
                    });
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="row g-3">
                  {/* Product Image Upload */}
                  <div className="col-12">
                    <div className="d-flex flex-column align-items-center">
                      <div 
                        className="position-relative mb-3"
                        style={{ 
                          width: '200px', 
                          height: '200px',
                          border: '2px dashed #d9dee3',
                          borderRadius: '0.5rem',
                          overflow: 'hidden'
                        }}
                      >
                        {formData.image ? (
                          <img 
                            src={typeof formData.image === 'string' 
                              ? `/storage/${formData.image}` 
                              : URL.createObjectURL(formData.image)} 
                            alt="Product" 
                            className="w-100 h-100 object-fit-cover"
                          />
                        ) : (
                          <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                            <i className="ri-image-add-line fs-1 text-muted mb-2"></i>
                            <span className="text-muted">Upload Product Image</span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ width: '200px' }}
                      />
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Product Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="ri-product-hunt-line"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                        required
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Product Price */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Price</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">$</span>
                      <input
                        type="number"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                      {errors.price && (
                        <div className="invalid-feedback">{errors.price[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Description</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="ri-file-text-line"></i>
                      </span>
                      <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter product description"
                        rows="3"
                      />
                      {errors.description && (
                        <div className="invalid-feedback">{errors.description[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Stock Quantity */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Stock Quantity</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="ri-store-2-line"></i>
                      </span>
                      <input
                        type="number"
                        className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="Enter stock quantity"
                        min="0"
                        required
                      />
                      {errors.stock && (
                        <div className="invalid-feedback">{errors.stock[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Product Status */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="ri-checkbox-circle-line"></i>
                      </span>
                      <select
                        className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                      {errors.status && (
                        <div className="invalid-feedback">{errors.status[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Active Status</label>
                    <div className="form-check form-switch">
                      <input
                        className={`form-check-input ${errors.is_active ? 'is-invalid' : ''}`}
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label">
                        {formData.is_active ? 'Active' : 'Inactive'}
                      </label>
                      {errors.is_active && (
                        <div className="invalid-feedback">{errors.is_active[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Category Input */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Category</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="ri-folder-line"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="Enter category"
                        required
                      />
                      {errors.category && (
                        <div className="invalid-feedback">{errors.category[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Brand Input */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Brand</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="ri-price-tag-3-line"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control ${errors.brand ? 'is-invalid' : ''}`}
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Enter brand"
                        required
                      />
                      {errors.brand && (
                        <div className="invalid-feedback">{errors.brand[0]}</div>
                      )}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end gap-2">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setShowModal(false);
                          setEditingProduct(null);
                          setFormData({
                            name: '',
                            description: '',
                            price: '',
                            stock: '',
                            category: '',
                            brand: '',
                            status: 'draft',
                            is_active: true,
                            image: null
                          });
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editingProduct ? 'Update Product' : 'Add Product'}
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
}

export default Product;