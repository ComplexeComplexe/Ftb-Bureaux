'use client';

import { motion } from 'framer-motion';

interface FloatingFilterButtonProps {
  onClick: () => void;
  activeFiltersCount?: number;
}

export default function FloatingFilterButton({ onClick, activeFiltersCount = 0 }: FloatingFilterButtonProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-16 right-4 z-20"
    >
      <button
        onClick={onClick}
        className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-french-tech-blue text-white shadow-lg hover:shadow-xl transition-shadow duration-200"
        aria-label="Ouvrir les filtres avancés"
      >
        <span className="material-symbols-outlined text-3xl">tune</span>
        
        {/* Badge pour les filtres actifs */}
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-french-tech-red text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
          >
            {activeFiltersCount > 9 ? '9+' : activeFiltersCount}
          </motion.div>
        )}
      </button>
    </motion.div>
  );
}