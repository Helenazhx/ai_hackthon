// src/components/LandingPage/AnimatedText.js
'use client'

import React from 'react';

const AnimatedText = ({ text, className = '', delay = 0 }) => {
  // Split text into words and add spans with staggered delays
  const words = text.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block animate-fade-up opacity-0"
          style={{
            animationDelay: `${delay + (index * 0.1)}s`,
            animationFillMode: 'forwards'
          }}
        >
          {word}
          {/* Add space between words */}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;