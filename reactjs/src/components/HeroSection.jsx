import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowRight } from 'react-icons/fi';


const HeroSection = ({ pageName }) => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/hero-sections/${pageName}`);
        setHeroData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load hero section');
        console.error('Error fetching hero section:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [pageName]);

  if (loading) {
    return (
      <div className="hero-section hero-loading">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="hero-error" role="alert">
                {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!heroData) {
    return null;
  }

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="hero-title">{heroData.title}</h1>
              <p className="hero-subtitle">{heroData.subtitle}</p>
              {heroData.button_text && heroData.button_link && (
                <div className="">
                  <a href={heroData.button_link} className="hero-cta">
                    {heroData.button_text} <FiArrowRight />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-image-container">
              <img
                src={heroData.image ? `http://localhost:8000/storage/${heroData.image}` : 'https://via.placeholder.com/800x600?text=No+Image'}
                alt={heroData.title}
                className="hero-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;