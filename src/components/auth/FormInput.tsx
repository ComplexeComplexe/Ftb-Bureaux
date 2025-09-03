import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  error?: FieldError;
  className?: string;
  [key: string]: any;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-french-tech-blue focus:border-french-tech-blue transition-colors ${
            error ? 'border-french-tech-red' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-french-tech-red">{error.message}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
