interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div className={`p-3 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <p className="text-sm text-french-tech-red">{message}</p>
    </div>
  );
}
