'use client';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function RadioGroup({ label, options, value, onChange, error }: RadioGroupProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              value === option.value
                ? 'border-french-tech-blue bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                value === option.value
                  ? 'border-french-tech-blue'
                  : 'border-gray-300'
              }`}>
                {value === option.value && (
                  <div className="w-2.5 h-2.5 bg-french-tech-blue rounded-full"></div>
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-gray-600">{option.description}</div>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-french-tech-red">{error}</p>
      )}
    </div>
  );
}
