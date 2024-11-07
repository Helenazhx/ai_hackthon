import React from 'react';

const AiInsights = ({ insights }) => {
  const parseMarkdown = (content) => {
    if (!content) return '';
    
    let formatted = content;
    
    // Handle bold (**text**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic (*text*)
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    return formatted;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="prose max-w-none">
        {insights.split('\n').map((paragraph, index) => {
          if (!paragraph.trim()) return <div key={index} className="h-4" />;
          
          return (
            <div
              key={index}
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(paragraph) }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AiInsights;