import React from 'react';
import { Calculator, ArrowRight, Sparkles } from 'lucide-react';

const FancySubmitButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-[2px] transition-all hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"
    >
      <div className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 transition-all group-hover:bg-opacity-0">
        <Sparkles className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
        <span className="text-lg font-semibold text-white">Calculate Your Household Value</span>
        <Calculator className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
      </div>
      
      {/* Animated background effect */}
      <div className="absolute inset-0 transform opacity-20 transition-transform group-hover:translate-x-full">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent to-white blur-lg" />
      </div>
    </button>
  );
};

export default FancySubmitButton;