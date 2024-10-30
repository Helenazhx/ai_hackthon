
'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info, DollarSign, Clock, Calculator } from 'lucide-react'
import { countries } from '@/lib/constants/locationData';
import styles from './HouseworkCalculator.module.css';


const HouseworkCalculatorView = ({
  country,
  region,
  tasks,
  hours,
  customRates,
  taskLabels,
  taskDescriptions,
  total,
  onCountryChange,
  onRegionChange,
  onTaskToggle,
  onHoursChange,
  onRateChange
}) => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader className={styles.header}>
          <div className={styles.headerContent}>
            <Calculator className="w-8 h-8" />
            <CardTitle className={styles.title}>Housework Value Calculator</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Location Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={styles.locationSelector}>
                <label className={styles.selectorLabel}>
                  <span>Select Country</span>
                </label>
                <Select value={country} onValueChange={(value) => {
                  onCountryChange(value);
                  onRegionChange(''); // Reset region when country changes
                }}>
                  <SelectTrigger className={styles.selectTrigger}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(countries).map(([code, data]) => (
                      <SelectItem key={code} value={code}>
                        {data.flag} {data.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {country && (
                <div className={styles.locationSelector}>
                  <label className={styles.selectorLabel}>
                    <span>Select Region</span>
                  </label>
                  <Select value={region} onValueChange={onRegionChange}>
                    <SelectTrigger className={styles.selectTrigger}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific region</SelectItem>
                      {Object.entries(countries[country].regions).map(([code, data]) => (
                        <SelectItem key={code} value={code}>
                          {data.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Tasks Grid Header */}
            <div className={styles.gridHeader}>
              <div className="font-semibold">Task</div>
              <div className={styles.columnHeader}>
                <DollarSign className="w-4 h-4 mr-1" />
                <span>Rate/Hour</span>
              </div>
              <div className={styles.columnHeader}>
                <Clock className="w-4 h-4 mr-1" />
                <span>Hours/Day</span>
              </div>
              <div className="text-right font-semibold">Daily Value</div>
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
              {Object.keys(tasks).map(task => (
                <div 
                  key={task} 
                  className={`${styles.taskRow} ${tasks[task] ? styles.taskRowActive : styles.taskRowInactive}`}
                >
                  <div className={styles.taskLabel}>
                    <Checkbox
                      checked={tasks[task]}
                      onCheckedChange={() => onTaskToggle(task)}
                      className={styles.checkbox}
                    />
                    <label className="text-sm font-medium flex items-center">
                      {taskLabels[task]}
                      <Tooltip content={taskDescriptions[task]}>
                        <Info className={styles.infoIcon} />
                      </Tooltip>
                    </label>
                  </div>
                  
                  <div className="text-center">
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      value={customRates[task]}
                      onChange={(e) => onRateChange(task, e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                  
                  {tasks[task] ? (
                    <>
                      <div className="text-center">
                        <Input
                          type="number"
                          min="0"
                          step="0.5"
                          value={hours[task]}
                          onChange={(e) => onHoursChange(task, e.target.value)}
                          className={styles.inputField}
                        />
                      </div>
                      <div className="text-right font-semibold text-blue-600">
                        ${(hours[task] * customRates[task]).toFixed(2)}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center text-gray-400">-</div>
                      <div className="text-right text-gray-400">-</div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className={styles.totalSection}>
              <div className={styles.totalCard}>
                <h3 className={styles.totalValue}>
                  Total Daily Value: ${total}
                </h3>
                <p className={styles.totalDescription}>
                  Based on {region ? countries[country].regions[region].name : countries[country].name} rates
                </p>
              </div>
              
              {/* Additional Statistics */}
              {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-600">Monthly Value</h4>
                  <p className="text-lg font-bold text-blue-600">${(parseFloat(total) * 30).toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-600">Weekly Value</h4>
                  <p className="text-lg font-bold text-blue-600">${(parseFloat(total) * 7).toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-600">Active Tasks</h4>
                  <p className="text-lg font-bold text-blue-600">
                    {Object.values(tasks).filter(Boolean).length} of {Object.keys(tasks).length}
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HouseworkCalculatorView;