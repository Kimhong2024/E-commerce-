import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import HeroSection from '../components/HeroSection';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import '../styles/shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 1000 });
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, sortBy, selectedPriceRange]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      
      // Set price range based on products
      if (response.data.length > 0) {
        const prices = response.data.map(product => product.price);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        setPriceRange({ min: minPrice, max: maxPrice });
        setSelectedPriceRange({ min: minPrice, max: maxPrice });
      }
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
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category_id === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= selectedPriceRange.min && 
      product.price <= selectedPriceRange.max
    );
    
    // Sort products
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredProducts(result);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedPriceRange({
      ...selectedPriceRange,
      [e.target.name]: value
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('default');
    setSelectedPriceRange({ min: priceRange.min, max: priceRange.max });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (loading) {
    return (
      <div className="shop-page">
        <HeroSection pageName="shop" />
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-page">
        <HeroSection pageName="shop" />
        <div className="container py-5">
          <div className="alert alert-danger text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <HeroSection pageName="shop" />

      <section className="shop-content">
        <div className="container">
          <div className="row">
            {/* Filters Sidebar */}
            <div className="col-lg-3">
              <div className="filters-sidebar">
                <div className="filters-header">
                  <h5>Filters</h5>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>

                <div className="search-box mb-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FiSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    {searchTerm && (
                      <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => setSearchTerm('')}
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                </div>

                <div className="categories-filter mb-4">
                  <h5>Categories</h5>
                  <div className="category-list">
                    <button
                      className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                      onClick={() => handleCategoryChange('all')}
                    >
                      All Products
                    </button>
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sort-filter">
                  <h5>Sort By</h5>
                  <select 
                    className="form-select" 
                    value={sortBy} 
                    onChange={handleSortChange}
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-lg-9">
              <div className="products-header mb-4">
                <h2>All Products</h2>
                <div className="products-count">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              </div>

              <div className="row">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                      <div className="product-card">
                        <div className="product-image">
                          <img 
                            src={product.image ? `http://localhost:8000/storage/${product.image}` : 'https://via.placeholder.com/300'} 
                            alt={product.name} 
                          />
                          <div className="product-actions">
                            <button className="action-btn">
                              <FiHeart />
                            </button>
                            <button 
                              className="action-btn"
                              onClick={() => handleAddToCart(product)}
                            >
                              <FiShoppingCart />
                            </button>
                          </div>
                        </div>
                        <div className="product-info">
                          <h3>{product.name}</h3>
                          <div className="product-price">${product.price}</div>
                          <button 
                            className="btn btn-primary add-to-cart"
                            onClick={() => handleAddToCart(product)}
                          >
                            <FiShoppingCart /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h4>No products found</h4>
                    <p>Try adjusting your search or filter criteria</p>
                    <button 
                      className="btn btn-outline-primary mt-3" 
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;