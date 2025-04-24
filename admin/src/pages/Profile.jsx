import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/admin/user');
        setUser(response.data);
        setFormData(prev => ({
          ...prev,
          name: response.data.name,
          email: response.data.email
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          navigate('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    try {
      // Only include password fields if they are filled
      const dataToSend = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.current_password && formData.password && formData.password_confirmation) {
        dataToSend.current_password = formData.current_password;
        dataToSend.password = formData.password;
        dataToSend.password_confirmation = formData.password_confirmation;
      }

      const response = await axios.put('/admin/profile', dataToSend);
      setUser(response.data.user);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        current_password: '',
        password: '',
        password_confirmation: ''
      }));
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'An error occurred while updating your profile' });
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-4">
                <div className="col-12">
                  <h4 className="fw-bold mb-0">Profile Settings</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Personal Information</h5>
                    </div>
                    <div className="card-body">
                      {successMessage && (
                        <div className="alert alert-success" role="alert">
                          {successMessage}
                        </div>
                      )}
                      {errors.general && (
                        <div className="alert alert-danger" role="alert">
                          {errors.general}
                        </div>
                      )}
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                            {errors.name && (
                              <div className="invalid-feedback">{errors.name[0]}</div>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                            {errors.email && (
                              <div className="invalid-feedback">{errors.email[0]}</div>
                            )}
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-12">
                            <h5 className="mb-3">Change Password</h5>
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">Current Password</label>
                            <input
                              type="password"
                              className={`form-control ${errors.current_password ? 'is-invalid' : ''}`}
                              name="current_password"
                              value={formData.current_password}
                              onChange={handleChange}
                            />
                            {errors.current_password && (
                              <div className="invalid-feedback">{errors.current_password[0]}</div>
                            )}
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">New Password</label>
                            <input
                              type="password"
                              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            {errors.password && (
                              <div className="invalid-feedback">{errors.password[0]}</div>
                            )}
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">Confirm New Password</label>
                            <input
                              type="password"
                              className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                              name="password_confirmation"
                              value={formData.password_confirmation}
                              onChange={handleChange}
                            />
                            {errors.password_confirmation && (
                              <div className="invalid-feedback">{errors.password_confirmation[0]}</div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <button type="submit" className="btn btn-primary">
                            <i className="ri-save-line me-2"></i> Save Changes
                          </button>
                        </div>
                      </form>
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

export default Profile; 