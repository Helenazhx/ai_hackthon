// src/components/LandingPage/index.js
'use client'

import React, { useEffect } from 'react';
import LandingPageView from './LandingPageView';

const LandingPage = () => {
  useEffect(() => {
    // Fade in text elements sequentially on load
    const textElements = document.querySelectorAll('.animate-fade-in');
    textElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-100');
      }, index * 400);
    });
  }, []);

  const scrollToCalculator = () => {
    document.getElementById('calculator-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return <LandingPageView onScrollToCalculator={scrollToCalculator} />;
};

export default LandingPage;