import { ButtonHTMLAttributes, ReactNode } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  loadingText?: string;
}

export default function AuthButton({
  children,
  variant = 'primary',
  isLoading = false,
  loadingText = 'Chargement...',
  className = '',
  disabled,
  ...props
}: AuthButtonProps) {
  const baseClasses = 'w-full py-3 px-4 rounded-lg font-medium focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-french-tech-blue text-white hover:bg-french-tech-blue-600 focus:ring-french-tech-blue',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
