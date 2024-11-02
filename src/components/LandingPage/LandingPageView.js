'use client'

import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import HouseworkCalculator from '../HouseworkCalculator';
import AnimatedText from './AnimatedText';
import MethodologySection from './MethodologySection';
import HouseholdValueSummary from './HouseholdValueSummary';

const LandingPageView = ({ onScrollToCalculator, userData, setUserData }) => {
  const [calculationData, setCalculationData] = useState(null);

  // Load calculation data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('calculationResults');
    if (savedData) {
      setCalculationData(JSON.parse(savedData));
    }
  }, []);

  const handleCalculatorSubmit = (calculationData) => {
    // Save to localStorage
    localStorage.setItem('calculationResults', JSON.stringify(calculationData));
    // Update state
    setCalculationData(calculationData);
    // Scroll to methodology section instead of navigating
    document.getElementById('summary-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            <AnimatedText 
              text="Discover the True Value" 
              delay={0.2}
            />
            <br />
            <AnimatedText 
              text="of Your Housework" 
              delay={1.0}
            />
          </h1>
          
          <div className="mb-8">
            <AnimatedText 
              text="Every hour of household labor has real economic worth."
              className="text-xl md:text-2xl text-gray-600 block mb-2"
              delay={1.8}
            />
            <AnimatedText 
              text="Our calculator helps you understand and appreciate the value of your domestic contributions."
              className="text-xl md:text-2xl text-gray-600 block"
              delay={2.4}
            />
          </div>
          
          <div className="mb-12">
            <AnimatedText 
              text="From cooking to childcare, cleaning to home maintenance -"
              className="text-lg md:text-xl text-gray-500 block mb-2"
              delay={3.0}
            />
            <AnimatedText 
              text="quantify your contribution to your household's economy."
              className="text-lg md:text-xl text-gray-500 block"
              delay={3.6}
            />
          </div>
          
          {/* User Input Section */}
          <div className="mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '4.0s', animationFillMode: 'forwards' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="text"
                placeholder="Your Name"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={userData.gender}
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <button 
            onClick={onScrollToCalculator}
            className="group flex flex-col items-center transition-transform hover:translate-y-2 opacity-0 animate-fade-up"
            style={{ animationDelay: '4.8s', animationFillMode: 'forwards' }}
          >
            <span className="text-gray-600 mb-2">Calculate Now</span>
            <ArrowDown className="w-6 h-6 text-gray-600 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Calculator Section */}
      <div id="calculator-section" className="min-h-screen bg-white py-16">
        <HouseworkCalculator onSubmit={handleCalculatorSubmit} />
      </div>

      {/* HouseholdValueSummary Section */}
      <div id="summary-section" className="bg-gray-50 py-16">
        <HouseholdValueSummary 
          calculationData={calculationData} 
          userData={userData}
        />
      </div>

      {/* Methodology Section */}
      <MethodologySection />
    </main>
  );
};

export default LandingPageView;
