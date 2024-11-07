'use client'

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, AlertCircle } from 'lucide-react';
import AiInsights from '@/components/ui/aiinsightformating';

const HouseholdValueSummary = ({ calculationData, userData }) => {
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAiInsights(null);
    return () => {
      setAiInsights(null);
      setError(null);
    };
  }, [calculationData]);

 const calculateTotalHours = (hours, tasks) => {
    if (!hours || !tasks) return 0;
    
    try {
      return Object.entries(hours)
        .filter(([task]) => tasks[task])
        .reduce((total, [_, value]) => total + parseFloat(value || 0), 0)
        .toFixed(1);
    } catch (error) {
      console.error('Error calculating total hours:', error);
      return 0;
    }
  };

  // Calculate total weekly hours with null checks
  const totalWeeklyHours = calculationData?.hours && calculationData?.tasks
    ? calculateTotalHours(calculationData.hours, calculationData.tasks)
    : 0;
  // Calculate weekly value (assuming annual value is based on 52 weeks)
  const weeklyValue = (calculationData?.total|| 0) * 7;
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const generateAiInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const prompt = constructPrompt(calculationData, userData);
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        // Add timeout and credentials
        credentials: 'same-origin',
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });
  
      const data = await response.json();
      console.log(data);
  
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate insights');
      }
  
      setAiInsights(data.insights);
    } catch (err) {
      console.error('Error generating insights:', err);
      setError(err.message || 'Unable to generate insights. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const constructPrompt = (calculationData, userData) => {

    return `
      Please analyze the following household work data and provide a warm, supportive, and practical response:

      User Profile:
      - Name: ${userData.name}
      - Gender: ${userData.gender}
      - Total Weekly Hours: ${totalWeeklyHours} hours
      - Weekly Value: $${weeklyValue.toFixed(2)}
      - Annual Value: $${weeklyValue * 52 || 0}

      Activity Breakdown:
      ${Object.entries(calculationData?.customRates || {})
        .map(([activity, hours]) => `- ${activity}: ${hours} hours per week`)
        .join('\n')}

      Please provide a response that includes following points:

      1. Value Recognition:
         - Acknowledge the significant economic contribution of their household work
         - Break down their contribution in terms of weekly and annual value
         - Compare this to market rates for similar services

      2. Supportive Message:
         ${totalWeeklyHours > 40 ? 
           `- This person is spending significant time (${totalWeeklyHours} hours/week) on household work
            - Please provide emotional validation and recognition of their hard work
            - Emphasize the importance of self-care and setting boundaries` 
           : 
           `- Acknowledge their consistent effort in maintaining their household`
         }

      3. Practical Suggestions:
         - Provide 3-4 specific, actionable ways to reduce their housework load
         - Focus on the activities they spend the most time on: ${
           Object.entries(calculationData?.activities || {})
             .sort(([,a], [,b]) => b - a)
             .slice(0, 2)
             .map(([activity]) => activity)
             .join(', ')
         }
         - Include both technological solutions and organizational strategies
         - Consider budget-friendly options

      4. Time Management Tips:
         - Suggest efficient scheduling or batching of tasks
         - Recommend ways to involve other household members if applicable
         - Provide tips for maintaining work-life balance

      Please format the response like a letter with no more than 500 words, clear paragraphs with appropriate spacing and use a conversational, empathetic tone throughout.
    `;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
        <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Your Household Value Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Basic Summary */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Basic Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Annual Value</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(weeklyValue * 52 || 0)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Monthly Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency((weeklyValue * 4|| 0) )}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">daily Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(calculationData?.total || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">AI Analysis</h3>
              <Button
                onClick={generateAiInsights}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MessageSquare className="w-4 h-4" />
                )}
                {loading ? 'Generating Insights...' : 'Generate AI Insights'}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {aiInsights && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="prose max-w-none">
                  <AiInsights insights={aiInsights} />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HouseholdValueSummary;
{/* Calculation Results Card - New Addition */}
//   {calculationData && (
//     <Card className="mb-16 transform transition-all hover:scale-105 bg-gradient-to-r from-blue-50 to-purple-50">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-2xl">
//           <Calculator className="w-6 h-6 text-blue-600" />
//           Your Household Value Summary
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-lg text-gray-700 leading-relaxed">
//           Based on your input, you contribute approximately{' '}
//           <span className="font-semibold text-blue-600">
//             {calculateTotalHours(calculationData.hours, calculationData.tasks)} hours
//           </span>{' '}
//           of household work daily, valued at{' '}
//           <span className="font-semibold text-purple-600">
//             {formatCurrency(calculationData.total)}
//           </span>{' '}
//           per day. This calculation considers various tasks including cooking, cleaning, childcare, and home maintenance, with rates adjusted for your location in{' '}
//           <span className="font-semibold">
//             {calculationData.region ? `${calculationData.region}, ` : ''}
//             {calculationData.country.toUpperCase()}
//           </span>.
//         </p>
//       </CardContent>
//     </Card>
//   )}