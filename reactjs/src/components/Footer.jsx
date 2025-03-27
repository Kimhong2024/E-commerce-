import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaArrowRight } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Quick Links */}
            <div className="footer-col" data-aos="fade-up" data-aos-delay="100">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/shop" className="footer-link">Shop</a></li>
                <li><a href="/about" className="footer-link">About Us</a></li>
                <li><a href="/contact" className="footer-link">Contact</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
              <h3 className="footer-title">Customer Service</h3>
              <ul className="footer-links">
                <li><a href="/faq" className="footer-link">FAQ</a></li>
                <li><a href="/shipping" className="footer-link">Shipping & Returns</a></li>
                <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
                <li><a href="/terms" className="footer-link">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="footer-col" data-aos="fade-up" data-aos-delay="300">
              <h3 className="footer-title">Follow Us</h3>
              <div className="social-links">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaTwitter className="social-icon" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaInstagram className="social-icon" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaFacebook className="social-icon" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaTiktok className="social-icon" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-col" data-aos="fade-up" data-aos-delay="400">
              <h3 className="footer-title">Newsletter</h3>
              <p className="footer-text">Subscribe for updates and special offers</p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="newsletter-input" 
                  required 
                />
                <button type="submit" className="newsletter-btn">
                  <FaArrowRight className="arrow-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;