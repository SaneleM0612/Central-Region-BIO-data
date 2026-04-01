import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly string[] | string[];
  placeholder?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide ml-1">
          {label} {props.required && <span className="text-pink-500">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-xl bg-gray-50 border-2 transition-all duration-300 outline-none appearance-none
              text-gray-800 cursor-pointer
              ${error 
                ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                : 'border-gray-100 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 hover:border-pink-300'
              }
              ${className}
            `}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-pink-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
        {error && <span className="text-xs text-red-500 ml-1 font-medium">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';