import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './about.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="hero-title">About SKIN CARE</h1>
          <p className="hero-subtitle">Natural Beauty, Radiant Skin</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image" data-aos="fade-right">
              <img 
                src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="About SKIN CARE" 
                className="main-image"
              />
              <div className="image-decoration"></div>
            </div>
            <div className="story-content" data-aos="fade-left">
              <h2 className="section-title">Our Story</h2>
              <p className="story-text">
                At SKIN CARE, we believe in the power of natural beauty and healthy skin. Our team is dedicated to bringing you the finest skincare products from leading brands that prioritize natural ingredients and sustainable practices. Whether you're looking for organic face creams, natural serums, or eco-friendly beauty tools, we've got you covered.
              </p>
              <p className="story-text">
                We are committed to creating a holistic beauty experience for our customers. From carefully curated product selections to expert skincare advice, we strive to help you achieve your healthiest, most radiant skin. Thank you for choosing us as your trusted partner in natural beauty.
              </p>
              <button className="learn-more-btn">
                Learn More <FiArrowRight className="icon" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title text-center">Our Values</h2>
          <div className="values-grid">
            <div className="value-card" data-aos="fade-up" data-aos-delay="100">
              <div className="value-icon">🌿</div>
              <h3>Natural Ingredients</h3>
              <p>We source only the purest natural ingredients and ensure all products are cruelty-free.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <div className="value-icon">🌎</div>
              <h3>Sustainability</h3>
              <p>Committed to eco-friendly practices and sustainable packaging solutions.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="300">
              <div className="value-icon">💆‍♀️</div>
              <h3>Personal Care</h3>
              <p>Your skin's health is our priority with personalized skincare consultations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title text-center">Meet Our Team</h2>
          <p className="section-subtitle">The passionate experts behind SKIN CARE</p>
          <div className="team-grid">
            <div className="team-card" data-aos="zoom-in">
              <div className="team-image">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Team member" />
              </div>
              <h3>Emma Wilson</h3>
              <p className="team-role">Founder & Skincare Expert</p>
            </div>
            <div className="team-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="team-image">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team member" />
              </div>
              <h3>Sophia Chen</h3>
              <p className="team-role">Product Specialist</p>
            </div>
            <div className="team-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="team-image">
                <img src="https://randomuser.me/api/portraits/women/75.jpg" alt="Team member" />
              </div>
              <h3>Isabella Martinez</h3>
              <p className="team-role">Beauty Consultant</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;