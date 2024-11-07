'use client'
import { useState } from 'react'
import { baseRates, taskLabels, taskDescriptions } from '@/lib/constants/rates'
import { countries, getRegionRates } from '@/lib/constants/locationData'
import HouseworkCalculatorView from './HouseworkCalculatorView'
import { Alert, AlertDescription } from '@/components/ui/alert';

const HouseworkCalculator = ({ onSubmit }) => {
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
  const [error, setError] = useState('');
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

  const calculateTotalHours = () => {
    return Object.entries(tasks).reduce((total, [task, isActive]) => {
      return isActive ? total + (hours[task] || 0) : total;
    }, 0);
  };

  const handleHoursChange = (task, value) => {
    const newValue = Math.min(parseFloat(value) || 0, 24);
    const otherTasksHours = calculateTotalHours() - (hours[task] || 0);
    
    if (newValue + otherTasksHours > 24) {
      setError('Total hours across all tasks cannot exceed 24 hours per day');
      return;
    }

    setError('');
    setHours(prev => ({
      ...prev,
      [task]: newValue
    }));
  };

  const handleTaskToggle = (task) => {
    const newTasks = {
      ...tasks,
      [task]: !tasks[task]
    };
    
    // Calculate total hours with the new task state
    const totalHours = Object.entries(newTasks).reduce((total, [currentTask, isActive]) => {
      return isActive ? total + (hours[currentTask] || 0) : total;
    }, 0);

    if (totalHours > 24) {
      setError('Total hours across all tasks cannot exceed 24 hours per day');
      return;
    }

    setError('');
    setTasks(newTasks);
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
    setRegion('');
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
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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
        onSubmit={onSubmit}
      />
    </>
  );
};

export default HouseworkCalculator;