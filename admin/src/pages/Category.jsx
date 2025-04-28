import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/categories');
      if (response.data) {
        setCategories(response.data);
      } else {
        throw new Error('No data received from server');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (error.response) {
        setErrorMessage(`Failed to fetch categories: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        setErrorMessage('Failed to fetch categories: No response from server');
      } else {
        setErrorMessage(`Failed to fetch categories: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
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
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      let response;
      if (editingCategory) {
        response = await axios.put(`/categories/${editingCategory.id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        setSuccessMessage('Category updated successfully');
      } else {
        response = await axios.post('/categories', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        setSuccessMessage('Category created successfully');
      }

      if (response.data) {
        setShowModal(false);
        setFormData({ name: '', description: '', image: null });
        setEditingCategory(null);
        fetchCategories();
      } else {
        throw new Error('No response data received');
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

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`/categories/${id}`);
        setSuccessMessage('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        console.error('Delete error:', error);
        if (error.response) {
          setErrorMessage(`Failed to delete category: ${error.response.data.message || 'Server error'}`);
        } else if (error.request) {
          setErrorMessage('Failed to delete category: No response from server');
        } else {
          setErrorMessage(`Failed to delete category: ${error.message}`);
        }
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {errorMessage}
                  <button type="button" className="btn-close" onClick={() => setErrorMessage('')}></button>
                </div>
              )}

              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Category Management</h4>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="ri-add-line me-2"></i> Add Category
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
                        <i className="ri-list-check me-2"></i> All Categories
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Category List</h5>
                  <div className="d-flex gap-2">
                    <div className="input-group input-group-sm" style={{ width: '300px' }}>
                      <span className="input-group-text bg-transparent">
                        <i className="ri-search-line"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control border-start-0" 
                        placeholder="Search categories..."
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
                        <th style={{ width: '15%' }}>Image</th>
                        <th style={{ width: '40%' }}>Description</th>
                        <th style={{ width: '15%' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="text-center py-4">
                            <div className="d-flex justify-content-center">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : filteredCategories.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-4">
                            <div className="d-flex flex-column align-items-center">
                              <i className="ri-search-line fs-1 text-muted mb-2"></i>
                              <p className="text-muted mb-0">No categories found</p>
                              {searchTerm && (
                                <small className="text-muted">Try adjusting your search</small>
                              )}
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredCategories.map((category) => (
                          <tr key={category.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div>
                                  <h6 className="mb-1 fw-semibold">{category.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              {category.image ? (
                                <img 
                                  src={`/storage/${category.image}`} 
                                  alt={category.name}
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
                              ) : (
                                <div 
                                  className="bg-light rounded-3 d-flex align-items-center justify-content-center"
                                  style={{ width: '60px', height: '60px' }}
                                >
                                  <i className="ri-image-line fs-4 text-muted"></i>
                                </div>
                              )}
                            </td>
                            <td>
                              <small className="text-muted text-truncate d-block" style={{ maxWidth: '400px' }}>
                                {category.description || 'No description'}
                              </small>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button 
                                  className="btn btn-sm btn-icon btn-outline-primary"
                                  onClick={() => handleEdit(category)}
                                  title="Edit"
                                >
                                  <i className="ri-edit-line" />
                                </button>
                                <button 
                                  className="btn btn-sm btn-icon btn-outline-danger"
                                  onClick={() => handleDelete(category.id)}
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

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                    setFormData({
                      name: '',
                      description: '',
                      image: null
                    });
                    setErrors({});
                  }}
                ></button>
                            </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="row g-3">
                  {/* Category Image Upload */}
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
                            alt="Category" 
                            className="w-100 h-100 object-fit-cover"
                          />
                        ) : (
                          <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                            <i className="ri-image-add-line fs-1 text-muted mb-2"></i>
                            <span className="text-muted">Upload Category Image</span>
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

                  {/* Category Name */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Category Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="ri-folder-line"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter category name"
                        required
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name[0]}</div>
                      )}
                    </div>
                            </div>

                  {/* Category Description */}
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
                        placeholder="Enter category description"
                        rows="3"
                      />
                      {errors.description && (
                        <div className="invalid-feedback">{errors.description[0]}</div>
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
                          setEditingCategory(null);
                          setFormData({
                            name: '',
                            description: '',
                            image: null
                          });
                          setErrors({});
                        }}
                      >
                        Cancel
                        </button>
                      <button type="submit" className="btn btn-primary">
                        {editingCategory ? 'Update Category' : 'Add Category'}
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
};

export default Category;