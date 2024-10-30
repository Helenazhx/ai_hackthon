// src/components/LandingPage/MethodologySection.js
'use client'

import { useState, useEffect } from 'react';
import { Book, Database, Calculator, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MethodologySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('methodology-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      id="methodology-section" 
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Our Methodology
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Understanding how we calculate the value of housework and where our data comes from
          </p>

          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>• Bureau of Labor Statistics wage data for domestic workers</li>
                  <li>• Industry standard rates for professional home services</li>
                  <li>• Regional cost-of-living adjustments</li>
                  <li>• Market rates for specialized household services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-500" />
                  Calculation Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>• Task-specific hourly rates based on professional equivalents</li>
                  <li>• Regional adjustments using local economic indicators</li>
                  <li>• Consideration of skill level and specialization</li>
                  <li>• Regular updates to maintain accuracy</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Cards in Same Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-purple-500" />
                  How We Value Each Task
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Cooking & Meal Preparation</h4>
                    <p className="text-gray-600">Based on professional chef hourly rates, adjusted for home cooking complexity</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Cleaning & Maintenance</h4>
                    <p className="text-gray-600">Derived from professional cleaning service rates and handyman fees</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Childcare</h4>
                    <p className="text-gray-600">Based on professional nanny and daycare provider rates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transform transition-all hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                  Regional Adjustments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We adjust our base rates using several regional factors:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li>• Local cost of living index</li>
                  <li>• Regional wage data for similar professions</li>
                  <li>• Market rates for household services in your area</li>
                  <li>• State and local economic indicators</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologySection;