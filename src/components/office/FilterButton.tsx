'use client';

interface FilterButtonProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export default function FilterButton({ label, isActive = false, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-x-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'border-french-tech-blue bg-french-tech-blue text-white'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
      <span className="material-symbols-outlined text-base">expand_more</span>
    </button>
  );
}
