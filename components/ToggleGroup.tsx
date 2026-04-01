import React from 'react';

interface ToggleGroupProps {
  label: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  required?: boolean;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ label, value, options, onChange, required }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide ml-1">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>
      <div className="flex p-1 bg-gray-100 rounded-xl w-full">
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300
                ${isActive 
                  ? 'bg-white text-pink-600 shadow-md ring-1 ring-pink-100' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};