import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Tooltip } from './ui/tooltip';
import { Info, DollarSign, Clock, Calculator } from 'lucide-react';

const HouseworkCalculatorView = ({
  country,
  tasks,
  hours,
  customRates,
  taskLabels,
  taskDescriptions,
  total,
  onCountryChange,
  onTaskToggle,
  onHoursChange,
  onRateChange
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-center space-x-3">
            <Calculator className="w-8 h-8" />
            <CardTitle className="text-3xl font-bold">Housework Value Calculator</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <span>Select Location</span>
              </label>
              <Select value={country} onValueChange={onCountryChange}>
                <SelectTrigger className="w-full md:w-64 border-2 hover:border-blue-400 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">🇺🇸 United States</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="au">🇦🇺 Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                <div className="col-span-1 font-semibold text-gray-700">Task</div>
                <div className="text-center font-semibold text-gray-700 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Rate/Hour
                </div>
                <div className="text-center font-semibold text-gray-700 flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Hours/Day
                </div>
                <div className="text-right font-semibold text-gray-700">Daily Value</div>
              </div>

              {Object.keys(tasks).map(task => (
                <div 
                  key={task} 
                  className={`grid grid-cols-4 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${
                    tasks[task] ? 'bg-white shadow-md' : 'bg-gray-50'
                  }`}
                >
                  <div className="col-span-1 flex items-center space-x-3">
                    <Checkbox
                      checked={tasks[task]}
                      onCheckedChange={() => onTaskToggle(task)}
                      className="w-5 h-5 border-2 data-[state=checked]:bg-blue-600"
                    />
                    <label className="text-sm font-medium flex items-center">
                      {taskLabels[task]}
                      <Tooltip content={taskDescriptions[task]}>
                        <Info className="inline-block h-4 w-4 ml-2 text-blue-400 cursor-help hover:text-blue-600 transition-colors" />
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
                      className="w-24 mx-auto text-center border-2 hover:border-blue-400 transition-colors"
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
                          className="w-24 mx-auto text-center border-2 hover:border-blue-400 transition-colors"
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

            <div className="mt-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white transform hover:scale-102 transition-transform duration-200">
                <h3 className="text-2xl font-bold text-center">
                  Total Daily Value: ${total}
                </h3>
                <p className="text-sm text-center text-blue-100 mt-2">
                  Based on your customized rates and time allocation
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HouseworkCalculatorView;