import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const HeroSection = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingHero, setEditingHero] = useState(null);
  const [formData, setFormData] = useState({
    page_name: '',
    title: '',
    subtitle: '',
    image: null,
    button_text: '',
    button_link: '',
    is_active: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchHeroSections();
  }, []);

  const fetchHeroSections = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/hero-sections');
      if (response.data) {
        setHeroSections(response.data);
      } else {
        throw new Error('No data received from server');
      }
    } catch (err) {
      console.error('Error fetching hero sections:', err);
      if (err.response) {
        setError(`Failed to fetch hero sections: ${err.response.data.message || 'Server error'}`);
      } else if (err.request) {
        setError('Failed to fetch hero sections: No response from server');
      } else {
        setError(`Failed to fetch hero sections: ${err.message}`);
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
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editingHero) {
        await axios.put(`/hero-sections/${editingHero.id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        setSuccess('Hero section updated successfully');
      } else {
        await axios.post('/hero-sections', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        setSuccess('Hero section created successfully');
      }
      setShowModal(false);
      fetchHeroSections();
    } catch (err) {
      console.error('Error saving hero section:', err);
      if (err.response) {
        setError(`Failed to save hero section: ${err.response.data.message || 'Server error'}`);
      } else if (err.request) {
        setError('Failed to save hero section: No response from server');
      } else {
        setError(`Failed to save hero section: ${err.message}`);
      }
    }
  };

  const handleEdit = (hero) => {
    setEditingHero(hero);
    setFormData({
      page_name: hero.page_name,
      title: hero.title,
      subtitle: hero.subtitle,
      image: null,
      button_text: hero.button_text || '',
      button_link: hero.button_link || '',
      is_active: hero.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hero section?')) {
      try {
        await axios.delete(`/hero-sections/${id}`);
        setSuccess('Hero section deleted successfully');
        fetchHeroSections();
      } catch (err) {
        console.error('Error deleting hero section:', err);
        if (err.response) {
          setError(`Failed to delete hero section: ${err.response.data.message || 'Server error'}`);
        } else if (err.request) {
          setError('Failed to delete hero section: No response from server');
        } else {
          setError(`Failed to delete hero section: ${err.message}`);
        }
      }
    }
  };

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
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-4">Hero Sections</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setEditingHero(null);
                        setFormData({
                          page_name: '',
                          title: '',
                          subtitle: '',
                          image: null,
                          button_text: '',
                          button_link: '',
                          is_active: true
                        });
                        setShowModal(true);
                      }}
                    >
                      <FiPlus className="me-2" /> Add Hero Section
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
                        <i className="ri-list-check me-2"></i> All Hero Section
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                        </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                      </div>
              )}

              <div className="card">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                        <th>Page</th>
                        <th>Title</th>
                        <th>Image</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                                </div>
                              </td>
                        </tr>
                      ) : heroSections.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">No hero sections found</td>
                        </tr>
                      ) : (
                        heroSections.map(hero => (
                          <tr key={hero.id}>
                            <td>{hero.page_name}</td>
                            <td>{hero.title}</td>
                            <td>
                              {hero.image && (
                                <img
                                  src={`http://localhost:8000/storage/${hero.image}`}
                                  alt={hero.title}
                                  style={{ width: '100px', height: 'auto' }}
                                />
                              )}
                              </td>
                              <td>
                              <span className={`badge bg-${hero.is_active ? 'success' : 'danger'}`}>
                                {hero.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(hero)}
                              >
                                <FiEdit2 />
                                  </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(hero.id)}
                              >
                                <FiTrash2 />
                                  </button>
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

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingHero ? 'Edit Hero Section' : 'Add Hero Section'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
                        </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Page Name</label>
                    <select
                      className="form-select"
                      name="page_name"
                      value={formData.page_name}
                      onChange={handleInputChange}
                      required
                      disabled={!!editingHero}
                    >
                      <option value="">Select Page</option>
                      <option value="home">Home</option>
                      <option value="shop">Shop</option>
                      <option value="about">About</option>
                      <option value="contact">Contact</option>
                          </select>
                        </div>

                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                      </div>

                  <div className="mb-3">
                    <label className="form-label">Subtitle</label>
                    <textarea
                      className="form-control"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      required
                      rows="3"
                    />
                    </div>

                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                                </div>

                  <div className="mb-3">
                    <label className="form-label">Button Text</label>
                    <input
                      type="text"
                      className="form-control"
                      name="button_text"
                      value={formData.button_text}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Button Link</label>
                    <input
                      type="text"
                      className="form-control"
                      name="button_link"
                      value={formData.button_link}
                      onChange={handleInputChange}
                    />
                </div>

                  <div className="mb-3">
                    <div className="form-check">
                                  <input 
                        type="checkbox"
                                    className="form-check-input" 
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

                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                        </button>
                    <button type="submit" className="btn btn-primary">
                      {editingHero ? 'Update' : 'Create'}
                                </button>
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

export default HeroSection;