import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import HeroSection from '../components/HeroSection';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <HeroSection pageName="contact" />

      <section className="contact-section">
        <div className="container">
          <div className="row">
            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="contact-info">
                <h3>Get in Touch</h3>
                <p>Have questions or feedback? We'd love to hear from you!</p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <FiMail className="contact-icon" />
                    <div>
                      <h4>Email</h4>
                      <p>info@example.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <FiPhone className="contact-icon" />
                    <div>
                      <h4>Phone</h4>
                      <p>+1 (123) 456-7890</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <FiMapPin className="contact-icon" />
                    <div>
                      <h4>Address</h4>
                      <p>123 Main Street, City, Country</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-container">
                <h3>Send us a Message</h3>
                
                {success && (
                  <div className="alert alert-success">
                    {success}
                  </div>
                )}
                
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <FiSend className="me-2" />
                    )}
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;