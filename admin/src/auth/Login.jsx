import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'; // Use the configured Axios instance

const AdminAuth = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
    
        try {
            const response = await axios.post('/admin/login', {
                email,
                password,
            });
    
            // Save the token in localStorage
            localStorage.setItem('adminToken', response.data.token);
    
            // Redirect to the dashboard or home page
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Validation errors
                setErrors(error.response.data.errors || {});
            } else if (error.response && error.response.status === 401) {
                // Authentication error
                setErrors({ general: 'Invalid credentials' });
            } else {
                // General error
                setErrors({
                    general: error.response?.data?.message || 'Login failed',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>{isLogin ? 'Admin Sign In' : 'Admin Registration'}</h2>
                    <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                    </p>
                </div>

                {errors.general && (
                    <div className="auth-error">
                        <span>{errors.general}</span>
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className={`form-input ${errors.name ? 'error' : ''}`}
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <p className="error-message">{errors.name[0]}</p>}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="error-message">{errors.email[0]}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className={`form-input ${errors.password ? 'error' : ''}`}
                            placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error-message">{errors.password[0]}</p>}
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="passwordConfirmation">Confirm Password</label>
                            <input
                                id="passwordConfirmation"
                                name="password_confirmation"
                                type="password"
                                required
                                className={`form-input ${errors.password_confirmation ? 'error' : ''}`}
                                placeholder="Confirm your password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                            {errors.password_confirmation && (
                                <p className="error-message">{errors.password_confirmation[0]}</p>
                            )}
                        </div>
                    )}

                    <button type="submit" disabled={loading} className="auth-button">
                        {loading ? (
                            <span className="spinner"></span>
                        ) : isLogin ? (
                            'Sign In'
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAuth;

// CSS Styles
const styles = `
.auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
}

.auth-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 420px;
    padding: 40px;
}

.auth-header {
    text-align: center;
    margin-bottom: 30px;
}

.auth-header h2 {
    color: #2d3748;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
}

.auth-toggle {
    color: #667eea;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s;
}

.auth-toggle:hover {
    color: #5a67d8;
    text-decoration: underline;
}

.auth-error {
    background-color: #fff5f5;
    border: 1px solid #fc8181;
    color: #e53e3e;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 20px;
    font-size: 14px;
}

.auth-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group label {
    font-size: 14px;
    color: #4a5568;
    font-weight: 500;
}

.form-input {
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    transition: all 0.2s;
}

.form-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.form-input.error {
    border-color: #fc8181;
}

.error-message {
    color: #e53e3e;
    font-size: 12px;
    margin-top: 4px;
}

.auth-button {
    background: #667eea;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.auth-button:hover {
    background: #5a67d8;
}

.auth-button:disabled {
    background: #a0aec0;
    cursor: not-allowed;
}

.spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
