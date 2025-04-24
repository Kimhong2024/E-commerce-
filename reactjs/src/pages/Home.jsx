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
    { 
      id: 'cleanser', 
      name: 'Cleansers',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
    },
    { 
      id: 'serum', 
      name: 'Serums',
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
    },
    { 
      id: 'moisturizer', 
      name: 'Moisturizers',
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 'sunscreen', 
      name: 'Sunscreens',
      image: 'data:image/jpeg;base64,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'
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
            {categories.map(category => (
              <div key={category.id} className="col-md-3 mb-4">
                <div className="category-card">
                  <div className="category-image">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      onError={(e) => {
                        console.error(`Error loading image for ${category.name}:`, e);
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                      }}
                    />
                  </div>
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <button 
                      className="btn btn-link"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      Shop Now <FiArrowRight />
                    </button>
                  </div>
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


     
    </div>
  );
};

export default Home;
