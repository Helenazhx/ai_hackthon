'use client'
import { useState } from 'react'
import { baseRates, taskLabels, taskDescriptions } from '@/lib/constants/rates'
import { countries, getRegionRates } from '@/lib/constants/locationData'
import HouseworkCalculatorView from './HouseworkCalculatorView'

const HouseworkCalculator = () => {
  const [country, setCountry] = useState('us');
  const [region, setRegion] = useState('');
  const [hours, setHours] = useState({
    cooking: 0,
    cleaning: 0,
    childcare: 0,
    laundry: 0,
    shopping: 0,
    maintenance: 0,
    organizing: 0
  });

  const [tasks, setTasks] = useState({
    cooking: false,
    cleaning: false,
    childcare: false,
    laundry: false,
    shopping: false,
    maintenance: false,
    organizing: false
  });

  // Initialize custom rates with base rates
  const [customRates, setCustomRates] = useState({
    cooking: baseRates.us.cooking,
    cleaning: baseRates.us.cleaning,
    childcare: baseRates.us.childcare,
    laundry: baseRates.us.laundry,
    shopping: baseRates.us.shopping,
    maintenance: baseRates.us.maintenance,
    organizing: baseRates.us.organizing
  });

  const calculateTotal = () => {
    let total = 0;
    Object.keys(tasks).forEach(task => {
      if (tasks[task]) {
        total += hours[task] * customRates[task];
      }
    });
    return total.toFixed(2);
  };

  const handleHoursChange = (task, value) => {
    setHours(prev => ({
      ...prev,
      [task]: parseFloat(value) || 0
    }));
  };

  const handleTaskToggle = (task) => {
    setTasks(prev => ({
      ...prev,
      [task]: !prev[task]
    }));
  };

  const handleRateChange = (task, value) => {
    setCustomRates(prev => ({
      ...prev,
      [task]: parseFloat(value) || 0
    }));
  };

  // Update custom rates when country changes
  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
    setRegion(''); // Reset region when country changes
    
    // Update rates with base rates for the new country
    setCustomRates(Object.keys(baseRates[newCountry]).reduce((acc, task) => {
      acc[task] = baseRates[newCountry][task];
      return acc;
    }, {}));
  };

  // New handler for region changes
  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
    
    if (newRegion) {
      // Calculate adjusted rates for the selected region
      const regionRates = getRegionRates(baseRates[country], country, newRegion);
      setCustomRates(regionRates);
    } else {
      // Reset to base rates if no region is selected
      setCustomRates(Object.keys(baseRates[country]).reduce((acc, task) => {
        acc[task] = baseRates[country][task];
        return acc;
      }, {}));
    }
  };

  return (
    <HouseworkCalculatorView
      country={country}
      region={region}
      tasks={tasks}
      hours={hours}
      customRates={customRates}
      taskLabels={taskLabels}
      taskDescriptions={taskDescriptions}
      total={calculateTotal()}
      onCountryChange={handleCountryChange}
      onRegionChange={handleRegionChange}
      onTaskToggle={handleTaskToggle}
      onHoursChange={handleHoursChange}
      onRateChange={handleRateChange}
    />
  );
};

export default HouseworkCalculator;