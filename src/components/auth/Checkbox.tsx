import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: FieldError;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={className}>
        <label className="flex items-start">
          <input
            ref={ref}
            type="checkbox"
            className="h-4 w-4 text-french-tech-blue focus:ring-french-tech-blue border-gray-300 rounded mt-1"
            {...props}
          />
          <span className="ml-2 text-sm text-gray-700">{label}</span>
        </label>
        {error && (
          <p className="mt-1 text-sm text-french-tech-red">{error.message}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
