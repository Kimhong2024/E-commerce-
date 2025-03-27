import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiShoppingCart, FiStar, FiClock } from 'react-icons/fi';
import './home.css'

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleanser', name: 'Cleansers' },
    { id: 'serum', name: 'Serums' },
    { id: 'moisturizer', name: 'Moisturizers' },
    { id: 'sunscreen', name: 'Sunscreens' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Glow Renewal Serum',
      price: 79.99,
      category: 'serum',
      rating: 4.5,
      image: 'https://i.pinimg.com/736x/bc/c3/1e/bcc31ece0cc8f686203030bb31ac7e9d.jpg',
      isNew: true
    },
    {
      id: 2,
      name: 'Hydra Boost Moisturizer',
      price: 59.99,
      category: 'moisturizer',
      rating: 4.2,
      image: 'https://i.pinimg.com/736x/26/1d/31/261d312769a88541cd44fe75a152f81b.jpg'
    },
    {
      id: 3,
      name: 'Gentle Foaming Cleanser',
      price: 29.99,
      category: 'cleanser',
      rating: 4.7,
      image: 'https://i.pinimg.com/736x/e2/d5/b3/e2d5b3e0c1c20a41069b363e4853d461.jpg',
      isBestSeller: true
    },
    {
      id: 4,
      name: 'UV Defense Sunscreen',
      price: 39.99,
      category: 'sunscreen',
      rating: 4.3,
      image: 'https://i.pinimg.com/736x/1a/8d/1f/1a8d1f8a0b8b8b8b8b8b8b8b8b8b8b8b.jpg'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah J.',
      comment: 'This serum transformed my skin in just 2 weeks!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael T.',
      comment: 'Best moisturizer I\'ve ever used for my dry skin.',
      rating: 4
    },
    {
      id: 3,
      name: 'Emma K.',
      comment: 'Gentle yet effective cleanser. Will repurchase!',
      rating: 5
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">
                Radiant Skin <br />
                Starts Here
              </h1>
              <p className="hero-subtitle">
                Discover our premium skincare collection formulated with natural ingredients
                for your healthiest skin yet.
              </p>
              <div className="hero-cta">
                <button className="btn btn-primary me-3">
                  Shop Now <FiArrowRight />
                </button>
                <button className="btn btn-outline-secondary">
                  Learn More
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" 
                  alt="Skincare products" 
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className={`features-banner ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="row">
            {[
              { icon: <FiClock />, title: 'Fast Shipping', text: 'Delivered in 2-3 days' },
              { icon: '💯', title: 'Quality Guarantee', text: 'Premium ingredients' },
              { icon: '🌿', title: 'Clean Beauty', text: 'Cruelty-free & vegan' },
              { icon: '🔄', title: 'Easy Returns', text: '30-day guarantee' }
            ].map((feature, index) => (
              <div key={index} className="col-md-3">
                <div className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <h5>{feature.title}</h5>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find the perfect products for your skincare routine</p>
          </div>
          
          <div className="row">
            {categories.slice(1).map(category => (
              <div key={category.id} className="col-md-3 mb-4">
                <div className="category-card">
                  <div className="category-image">
                    <img 
                      src={`https://source.unsplash.com/random/300x300/?${category.name}`} 
                      alt={category.name} 
                    />
                  </div>
                  <h3>{category.name}</h3>
                  <button className="btn btn-link">
                    Shop Now <FiArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Our Best Sellers</h2>
            <p>Products loved by our community</p>
          </div>
          <div className="row">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="product-card">
                  <div className="product-badges">
                    {product.isNew && <span className="badge new">New</span>}
                    {product.isBestSeller && <span className="badge bestseller">Bestseller</span>}
                  </div>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={i < Math.floor(product.rating) ? 'filled' : ''} 
                        />
                      ))}
                      <span>({product.rating})</span>
                    </div>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    <button className="btn btn-primary add-to-cart">
                      <FiShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real results from real people</p>
          </div>
          <div className="row">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="col-md-4">
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < testimonial.rating ? 'filled' : ''} />
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.comment}"</p>
                  <p className="testimonial-author">— {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;