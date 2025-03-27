import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './about.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="hero-title">About PHONE SHOP</h1>
          <p className="hero-subtitle">Innovation at your fingertips</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image" data-aos="fade-right">
              <img 
                src="https://images.samsung.com/is/image/samsung/assets/sg/2501/smartphones/galaxy-s25/reviews/galaxy-s25-share-image.jpg" 
                alt="About PHONE SHOP" 
                className="main-image"
              />
              <div className="image-decoration"></div>
            </div>
            <div className="story-content" data-aos="fade-left">
              <h2 className="section-title">Our Story</h2>
              <p className="story-text">
                At PHONE SHOP, we believe in innovation and excellence. Our team is dedicated to bringing you the best products from leading brands like Apple, Samsung, and Vivo. Whether you're looking for the latest smartphone, a powerful laptop, or cutting-edge accessories, we've got you covered.
              </p>
              <p className="story-text">
                We are committed to creating a seamless shopping experience for our customers. From easy navigation on our website to fast and reliable delivery, we strive to make every interaction with PHONE SHOP a positive one. Thank you for choosing us as your trusted partner in technology.
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
              <div className="value-icon">💎</div>
              <h3>Quality</h3>
              <p>We source only the highest quality devices and rigorously test all products.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Always at the forefront of the latest technology trends and advancements.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="300">
              <div className="value-icon">🤝</div>
              <h3>Customer First</h3>
              <p>Your satisfaction is our top priority with 24/7 support available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title text-center">Meet Our Team</h2>
          <p className="section-subtitle">The passionate people behind PHONE SHOP</p>
          <div className="team-grid">
            <div className="team-card" data-aos="zoom-in">
              <div className="team-image">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team member" />
              </div>
              <h3>David Kim</h3>
              <p className="team-role">Founder & CEO</p>
            </div>
            <div className="team-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="team-image">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team member" />
              </div>
              <h3>Sarah Johnson</h3>
              <p className="team-role">Product Manager</p>
            </div>
            <div className="team-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="team-image">
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Team member" />
              </div>
              <h3>Michael Chen</h3>
              <p className="team-role">Tech Specialist</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;