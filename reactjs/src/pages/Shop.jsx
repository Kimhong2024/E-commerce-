import React, { useState } from 'react';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import './shop.css';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleanser', name: 'Cleansers' },
    { id: 'serum', name: 'Serums' },
    { id: 'moisturizer', name: 'Moisturizers' },
    { id: 'sunscreen', name: 'Sunscreens' }
  ];

  const products = [
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
    },
    {
      id: 5,
      name: 'Brightening Vitamin C Serum',
      price: 65.99,
      category: 'serum',
      rating: 4.6,
      image: 'https://i.pinimg.com/736x/5b/8a/3d/5b8a3d3b3b3b3b3b3b3b3b3b3b3b3b3b.jpg',
      isNew: true
    },
    {
      id: 6,
      name: 'Deep Hydration Night Cream',
      price: 72.99,
      category: 'moisturizer',
      rating: 4.4,
      image: 'https://i.pinimg.com/736x/6a/7d/3b/6a7d3b3b3b3b3b3b3b3b3b3b3b3b3b3b.jpg'
    },
    {
      id: 7,
      name: 'Oil Control Cleanser',
      price: 34.99,
      category: 'cleanser',
      rating: 4.3,
      image: 'https://i.pinimg.com/736x/7a/8d/3b/7a8d3b3b3b3b3b3b3b3b3b3b3b3b3b3b.jpg'
    },
    {
      id: 8,
      name: 'Mineral Tinted Sunscreen',
      price: 45.99,
      category: 'sunscreen',
      rating: 4.5,
      image: 'https://i.pinimg.com/736x/8a/9d/3b/8a9d3b3b3b3b3b3b3b3b3b3b3b3b3b3b.jpg',
      isBestSeller: true
    }
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="shop-page">
      {/* Hero Section */}
      <section className="shop-hero">
        <div className="container">
          <h1 className="shop-hero-title">Shop Skincare</h1>
          <p className="shop-hero-subtitle">Discover products for your perfect routine</p>
        </div>
      </section>

      {/* Category Section */}
      <section className="category-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find the perfect products for your skincare routine</p>
          </div>

          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
                {activeCategory === category.id && <span className="tab-indicator"></span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.map(product => (
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;