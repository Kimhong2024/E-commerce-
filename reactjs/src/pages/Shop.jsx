import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import HeroSection from '../components/HeroSection';
import axios from 'axios';
import '../styles/shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    search: '',
    sort: 'latest'
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category_id === parseInt(filters.category)
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

    // Sort products
    switch (filters.sort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: 'all',
      search: '',
      sort: 'latest'
    });
  };

  return (
    <div className="shop-page">
      <HeroSection pageName="shop" />

      <div className="shop-content">
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-toggle">
          <button 
            className="btn btn-primary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="me-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-container">
            <div className="filters-header">
              <h3>Filters</h3>
              <button 
                className="btn btn-link"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>

            {/* Search */}
            <div className="filter-group">
              <label>Search Products</label>
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search products..."
                />
                {filters.search && (
                  <button 
                    className="clear-search"
                    onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  >
                    <FiX />
                  </button>
                )}
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
                <option value="all">All Categories</option>
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
                <option value="all">All Prices</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200-500">$200 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000-9999">Over $1000</option>
              </select>
            </div>

            {/* Sort */}
            <div className="filter-group">
              <label>Sort By</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
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

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your criteria</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-badges">
                    {product.is_new && <span className="badge new">New</span>}
                    {product.is_bestseller && <span className="badge bestseller">Bestseller</span>}
                  </div>
                  <div className="product-image">
                    <img 
                      src={product.image ? `http://localhost:8000/storage/${product.image}` : 'https://via.placeholder.com/300'} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                      }}
                    />
                    <div className="product-actions">
                      <button className="btn-wishlist">
                        <FiHeart />
                      </button>
                      <button className="btn-cart">
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={i < Math.floor(product.rating) ? 'filled' : ''}
                        />
                      ))}
                      <span>({product.rating})</span>
                    </div>
                    <div className="product-price">
                      ${Number(product.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;