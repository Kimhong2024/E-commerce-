import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const { cart, cartItemsCount, removeFromCart, updateQuantity } = useCart();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 10;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  if (cartItemsCount === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-content">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/shop" className="continue-shopping">
            <FiArrowLeft className="me-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <p className="cart-summary">You have {cartItemsCount} items in your cart</p>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.image ? `http://localhost:8000/storage/${item.image}` : 'https://via.placeholder.com/150'} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${Number(item.price).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div className="item-total">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    className="remove-item"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}</span>
            </div>
            {calculateShipping() > 0 && (
              <p className="free-shipping-note">
                Add ${(100 - calculateSubtotal()).toFixed(2)} more to get free shipping!
              </p>
            )}
            <div className="summary-row total">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="checkout-button">
              <span>Proceed to Checkout</span>
              <FiArrowRight className="checkout-icon" />
            </Link>
            <Link to="/shop" className="continue-shopping">
              <FiArrowLeft className="me-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 