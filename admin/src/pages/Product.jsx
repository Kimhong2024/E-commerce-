import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    brand: '',
    status: 'draft',
    is_active: true,
    image: null
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setErrorMessage('Failed to fetch categories');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    setSuccessMessage('');
    setErrorMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('category_id', formData.category_id);
    data.append('brand', formData.brand);
    data.append('status', formData.status);
    data.append('is_active', formData.is_active ? '1' : '0');
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      let response;
      if (editingProduct) {
        response = await axios.put(`/products/${editingProduct.id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        setSuccessMessage('Product updated successfully');
      } else {
        response = await axios.post('/products', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        setSuccessMessage('Product created successfully');
      }

      if (response.data) {
        setShowModal(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          stock: '',
          category_id: '',
          brand: '',
          status: 'draft',
          is_active: true,
          image: null
        });
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Operation error:', error);
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrorMessage(`Operation failed: ${error.response.data.message || 'Server error'}`);
        }
      } else if (error.request) {
        setErrorMessage('Operation failed: No response from server');
      } else {
        setErrorMessage(`Operation failed: ${error.message}`);
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
      category_id: product.category_id,
      brand: product.brand,
      status: product.status,
      is_active: product.is_active,
      image: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        setSuccessMessage('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error('Delete error:', error);
        if (error.response) {
          setErrorMessage(`Failed to delete product: ${error.response.data.message || 'Server error'}`);
        } else if (error.request) {
          setErrorMessage('Failed to delete product: No response from server');
        } else {
          setErrorMessage(`Failed to delete product: ${error.message}`);
        }
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.category && product.category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              {/* Success and Error Messages */}
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {errorMessage}
                  <button type="button" className="btn-close" onClick={() => setErrorMessage('')}></button>
                </div>
              )}

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
                        <i className="ri-list-check me-2"></i> All Product
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

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
                        placeholder="Search products..."
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
                        <th style={{ width: '30%' }}>Name</th>
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
                          <tr key={product.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                {product.image ? (
                                  <img 
                                    src={`http://localhost:8000/storage/${product.image}`} 
                                    alt={product.name}
                                    className="rounded-3 me-3"
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
                                ) : (
                                  <div 
                                    className="bg-light rounded-3 me-3 d-flex align-items-center justify-content-center"
                                    style={{ width: '60px', height: '60px' }}
                                  >
                                    <i className="ri-image-line fs-4 text-muted"></i>
                                  </div>
                                )}
                                <div>
                                  <h6 className="mb-1 fw-semibold">{product.name}</h6>
                                  <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>
                                    {product.description || 'No description'}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-label-primary">
                                {product.category?.name || 'Uncategorized'}
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
                              <span className={`badge bg-label-${product.stock > 10 ? 'success' : 'warning'}`}>
                                {product.stock}
                              </span>
                            </td>
                            <td>
                              <span className={`badge bg-label-${product.status === 'published' ? 'success' : product.status === 'draft' ? 'warning' : 'danger'}`}>
                                {product.status}
                              </span>
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
              </div>
            </div>
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
                      category_id: '',
                      brand: '',
                      status: 'draft',
                      is_active: true,
                      image: null
                    });
                    setErrors({});
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
                              ? `http://localhost:8000/storage/${formData.image}` 
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

                  {/* Category Selection */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Category</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="ri-folder-line"></i>
                      </span>
                      <select
                        className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category_id && (
                        <div className="invalid-feedback">{errors.category_id[0]}</div>
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

                  {/* Product Stock */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Stock</label>
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

                  {/* Product Brand */}
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
                        placeholder="Enter brand name"
                        required
                      />
                      {errors.brand && (
                        <div className="invalid-feedback">{errors.brand[0]}</div>
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
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                      {errors.status && (
                        <div className="invalid-feedback">{errors.status[0]}</div>
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

                  {/* Active Status */}
                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          is_active: e.target.checked
                        }))}
                      />
                      <label className="form-check-label">Active</label>
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
                            category_id: '',
                            brand: '',
                            status: 'draft',
                            is_active: true,
                            image: null
                          });
                          setErrors({});
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