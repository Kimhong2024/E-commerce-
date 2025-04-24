import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiSearch, FiArrowRight, } from 'react-icons/fi';
import './shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    search: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      
    } catch (err) {
      setError(err.message);
 
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by price range
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        return price >= min && price <= max;
      });
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleanser', name: 'Cleansers' },
    { id: 'serum', name: 'Serums' },
    { id: 'moisturizer', name: 'Moisturizers' },
    { id: 'sunscreen', name: 'Sunscreens' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-20', name: 'Under $20' },
    { id: '20-50', name: '$20 - $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100-9999', name: 'Over $100' }
  ];



  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="shop-page">
      {/* Hero Section */}
      <section className="shop-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="shop-hero-title">Discover Your Perfect Skincare</h1>
            <p className="shop-hero-subtitle">Explore our premium collection of skincare products</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
            </div>
            <a href="#products" className="hero-cta">
              Shop Now <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      <div className="shop-content">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-container">
            <h3>Filters</h3>
            
            {/* Search */}
            <div className="filter-group">
              <label>Search Products</label>
              <div className="search-box">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search products..."
                />
                <FiSearch className="search-icon" />
              </div>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <label>Categories</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <label>Price Range</label>
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <main className="products-section">
          <div className="products-header">
            <h2>All Products</h2>
            <p>Showing {filteredProducts.length} products</p>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-badges">
                  {product.isNew && <span className="badge new">New</span>}
                  {product.isBestSeller && <span className="badge bestseller">Bestseller</span>}
                </div>
                <div className="product-image">
                  <img 
                    src={product.image ? `http://localhost:8000/storage/${product.image}` : 'https://via.placeholder.com/300'} 
                    alt={product.name} 
                  />
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
                  <div className="product-price">${Number(product.price).toFixed(2)}</div>
                  <button className="add-to-cart">
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;