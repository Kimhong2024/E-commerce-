import React from 'react';
import { FiUsers, FiShield, FiTruck, FiStar } from 'react-icons/fi';
import HeroSection from '../components/HeroSection';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-page">
      <HeroSection pageName="about" />

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="story-content">
                <h2 className="section-title">Our Story</h2>
                <p className="story-text">
                  Founded in 2024, our e-commerce platform was born out of a passion for providing
                  high-quality products and exceptional customer service. We believe in making
                  online shopping a seamless and enjoyable experience for everyone.
                </p>
                <p className="story-text">
                  Our mission is to connect customers with the best products while maintaining
                  the highest standards of quality and customer satisfaction.
                </p>
                <div className="story-stats">
                  <div className="stat-item">
                    <h3>10K+</h3>
                    <p>Happy Customers</p>
                  </div>
                  <div className="stat-item">
                    <h3>500+</h3>
                    <p>Products</p>
                  </div>
                  <div className="stat-item">
                    <h3>24/7</h3>
                    <p>Support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="story-image">
                <img 
                  src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Our Team" 
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">What drives us every day</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="value-card">
                <div className="value-icon">
                  <FiUsers />
                </div>
                <h3>Customer First</h3>
                <p>
                  We prioritize our customers' needs and satisfaction above all else,
                  ensuring a positive shopping experience every time.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card">
                <div className="value-icon">
                  <FiShield />
                </div>
                <h3>Quality Assurance</h3>
                <p>
                  Every product in our store undergoes rigorous quality checks to
                  ensure we only offer the best to our customers.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card">
                <div className="value-icon">
                  <FiTruck />
                </div>
                <h3>Fast Delivery</h3>
                <p>
                  We understand the importance of timely delivery and work hard to
                  ensure your orders reach you as quickly as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">The people behind our success</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Team Member" 
                  />
                </div>
                <div className="team-info">
                  <h3>John Doe</h3>
                  <p className="team-role">Founder & CEO</p>
                  <div className="team-social">
                    <a href="#"><i className="ri-facebook-fill"></i></a>
                    <a href="#"><i className="ri-twitter-fill"></i></a>
                    <a href="#"><i className="ri-linkedin-fill"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d77dae54f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Team Member" 
                  />
                </div>
                <div className="team-info">
                  <h3>Jane Smith</h3>
                  <p className="team-role">Marketing Director</p>
                  <div className="team-social">
                    <a href="#"><i className="ri-facebook-fill"></i></a>
                    <a href="#"><i className="ri-twitter-fill"></i></a>
                    <a href="#"><i className="ri-linkedin-fill"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Team Member" 
                  />
                </div>
                <div className="team-info">
                  <h3>Mike Johnson</h3>
                  <p className="team-role">Operations Manager</p>
                  <div className="team-social">
                    <a href="#"><i className="ri-facebook-fill"></i></a>
                    <a href="#"><i className="ri-twitter-fill"></i></a>
                    <a href="#"><i className="ri-linkedin-fill"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;