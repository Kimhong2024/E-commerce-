import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiShoppingCart, FiStar, FiClock } from 'react-icons/fi';
import './home.css'

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
 
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchTopProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
  
    } catch (err) {
      setError(err.message);
   
    }
  };

  const fetchTopProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/dashboard/top-products');
      if (!response.ok) {
        throw new Error('Failed to fetch top products');
      }
      const data = await response.json();
      setTopProducts(data);
    } catch (err) {
      console.error('Error fetching top products:', err);
    }
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleanser', name: 'Cleansers' },
    { id: 'serum', name: 'Serums' },
    { id: 'moisturizer', name: 'Moisturizers' },
    { id: 'sunscreen', name: 'Sunscreens' }
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

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeCategory);



  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-titl">
                Radiant Skin <br />
                Starts Here
              </h1>
              <p className="hero-subtitle">
                Discover our premium skincare collection formulated with natural ingredients
                for your healthiest skin yet.
              </p>
              <div className="">
                 <a href="#products" className="hero-cta">
                    Shop Now <FiArrowRight />
                  </a>
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
                  <button 
                    className="btn btn-link"
                    onClick={() => setActiveCategory(category.id)}
                  >
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
            <h2>Top Products</h2>
            <p>Our most popular products based on customer orders</p>
          </div>
          <div className="row">
            {topProducts.map(product => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="product-card">
                  <div className="product-badges">
                    <span className="badge bestseller">Bestseller</span>
                  </div>
                  <div className="product-image">
                    <img 
                      src={product.image ? `http://localhost:8000/storage/${product.image}` : 'https://via.placeholder.com/300'} 
                      alt={product.name} 
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-price">${product.price}</div>
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
