import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiArrowLeft, FiCreditCard, FiLock, FiTruck, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartItemsCount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  // Validation states
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Confirmation
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cartItemsCount === 0 && !orderPlaced) {
      toast.info('Your cart is empty. Please add items before checkout.');
      navigate('/shop');
    }
  }, [cartItemsCount, navigate, orderPlaced]);
  
  // Calculate totals
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 10;
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax rate
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };
  
  // Handle form input changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      
      setPaymentInfo(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } 
    // Format expiry date
    else if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .trim();
      
      setPaymentInfo(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } 
    // Format CVV (numbers only)
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 3);
      
      setPaymentInfo(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } 
    else {
      setPaymentInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate shipping form
  const validateShipping = () => {
    const newErrors = {};
    
    if (!shippingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = 'Email is invalid';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validate payment form
  const validatePayment = () => {
    const newErrors = {};
    
    if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentInfo.expiryDate)) newErrors.expiryDate = 'Use format MM/YY';
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (paymentInfo.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      setStep(3);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  // Handle place order
  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      // First get the customer profile to get the correct customer ID
      const profileResponse = await fetch('http://localhost:8000/api/customer/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to get customer profile. Please log in again.');
      }

      const profileData = await profileResponse.json();
      const customerId = profileData.data.customer.id;

      // Prepare order data
      const orderData = {
        customer_id: customerId,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: parseFloat(item.price)
        })),
        shipping_address: `${shippingInfo.firstName} ${shippingInfo.lastName}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}`,
        billing_address: `${shippingInfo.firstName} ${shippingInfo.lastName}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}`,
        order_date: new Date().toISOString().split('T')[0],
        total_amount: parseFloat(calculateTotal().toFixed(2))
      };
      
      console.log('Sending order data:', orderData);
      
      // Make API call to create order
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API error response:', errorData);
        throw new Error(`Failed to create order: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API success response:', data);
      
      // Set order number from response
      setOrderNumber(data.order.order_number);
      
      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
      setStep(4);
      
      toast.success('Order placed successfully!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.message.includes('Failed to get customer profile')) {
        // Redirect to login if authentication failed
        navigate('/login');
      }
      toast.error(`Failed to place order: ${error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  // If order is placed, show confirmation
  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container py-5">
          <div className="order-confirmation">
            <div className="confirmation-icon">
              <FiCheck />
            </div>
            <h1>Thank You for Your Order!</h1>
            <p className="order-number">Order Number: {orderNumber}</p>
            <p className="confirmation-message">
              We've received your order and will begin processing it right away.
              You'll receive an email confirmation shortly.
            </p>
            <div className="confirmation-actions">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
              <button 
                className="btn btn-outline-primary"
                onClick={() => navigate('/orders')}
              >
                View Order History
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-page">
      <div className="container py-5">
        <div className="checkout-header">
          <button 
            className="btn btn-link back-button"
            onClick={() => navigate('/cart')}
          >
            <FiArrowLeft /> Back to Cart
          </button>
          <h1>Checkout</h1>
        </div>
        
        <div className="row">
          {/* Checkout Steps */}
          <div className="col-lg-8">
            <div className="checkout-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-title">Shipping</div>
              </div>
              <div className={`step-connector ${step >= 2 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-title">Payment</div>
              </div>
              <div className={`step-connector ${step >= 3 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-title">Review</div>
              </div>
            </div>
            
            {/* Shipping Information */}
            {step === 1 && (
              <div className="checkout-form">
                <h2>Shipping Information</h2>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                    />
                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                    />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    className="form-control"
                    value={shippingInfo.country}
                    onChange={handleShippingChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                    <option value="Brazil">Brazil</option>
                  </select>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={handleNextStep}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
            
            {/* Payment Information */}
            {step === 2 && (
              <div className="checkout-form">
                <h2>Payment Information</h2>
                <div className="payment-methods">
                  <div className="payment-method active">
                    <FiCreditCard />
                    <span>Credit Card</span>
                  </div>
                  <div className="payment-method">
                    <FiLock />
                    <span>PayPal</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="cardName">Cardholder Name *</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                    value={paymentInfo.cardName}
                    onChange={handlePaymentChange}
                  />
                  {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expiryDate">Expiry Date *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      maxLength="3"
                    />
                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={handlePrevStep}
                  >
                    Back to Shipping
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleNextStep}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}
            
            {/* Order Review */}
            {step === 3 && (
              <div className="checkout-form">
                <h2>Review Your Order</h2>
                
                <div className="review-section">
                  <h3>Shipping Information</h3>
                  <div className="review-details">
                    <p>
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                      {shippingInfo.country}<br />
                      {shippingInfo.email}<br />
                      {shippingInfo.phone}
                    </p>
                    <button 
                      className="btn btn-link"
                      onClick={() => setStep(1)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                
                <div className="review-section">
                  <h3>Payment Method</h3>
                  <div className="review-details">
                    <p>
                      Credit Card ending in {paymentInfo.cardNumber.slice(-4)}<br />
                      Expires: {paymentInfo.expiryDate}
                    </p>
                    <button 
                      className="btn btn-link"
                      onClick={() => setStep(2)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                
                <div className="review-section">
                  <h3>Order Items</h3>
                  <div className="review-items">
                    {cart.map(item => (
                      <div key={item.id} className="review-item">
                        <div className="item-image">
                          <img 
                            src={item.image ? `http://localhost:8000/storage/${item.image}` : 'https://via.placeholder.com/50'} 
                            alt={item.name} 
                          />
                        </div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={handlePrevStep}
                  >
                    Back to Payment
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {cart.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x {item.quantity}</span>
                    </div>
                    <div className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="secure-checkout">
                <FiLock />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 