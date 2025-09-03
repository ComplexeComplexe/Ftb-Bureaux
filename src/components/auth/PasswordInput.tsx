'use client';

import { useState, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface PasswordInputProps {
  label: string;
  error?: FieldError;
  className?: string;
  [key: string]: any;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-french-tech-blue focus:border-french-tech-blue transition-colors ${
              error ? 'border-french-tech-red' : 'border-gray-300'
            } ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            <span className="material-symbols-outlined text-xl">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
        {error && (
          <p className="mt-1 text-sm text-french-tech-red">{error.message}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
