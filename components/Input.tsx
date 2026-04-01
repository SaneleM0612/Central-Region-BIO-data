import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide ml-1">
          {label} {props.required && <span className="text-pink-500">*</span>}
        </label>
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl bg-gray-50 border-2 transition-all duration-300 outline-none
            placeholder-gray-400 text-gray-800
            ${error 
              ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
              : 'border-gray-100 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 hover:border-pink-300'
            }
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-red-500 ml-1 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';