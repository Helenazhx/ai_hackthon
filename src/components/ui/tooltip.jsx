import React from 'react'

export const Tooltip = ({ children, content }) => (
  <div className="group relative inline-block">
    {children}
    <div className="absolute z-10 invisible group-hover:visible w-64 bg-gray-800 text-white p-2 rounded-md shadow-lg">
      {content}
    </div>
  </div>
)