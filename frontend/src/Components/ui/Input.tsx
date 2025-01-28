import React from 'react';

interface InputProps {
  text: string;
  type: string;
  id: string;
  value: string;
  className?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // handle input changes generically
}

export default function Input({
  text,
  type,
  id,
  value,
  className = '',
  onChange,
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {text}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
      />
    </div>
  );
}
