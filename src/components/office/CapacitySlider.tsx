'use client';

interface CapacitySliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  error?: string;
}

export default function CapacitySlider({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step, 
  error 
}: CapacitySliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-lg font-semibold text-french-tech-blue">
          {value} personne{value > 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-french-tech-red">{error}</p>
      )}
    </div>
  );
}
