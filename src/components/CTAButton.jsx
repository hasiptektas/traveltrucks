import React from 'react';

export default function CTAButton({ children, ...props }) {
  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors duration-300 text-base"
      {...props}
    >
      {children}
    </button>
  );
} 