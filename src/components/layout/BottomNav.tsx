'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';

interface NavItem {
  href: string;
  icon: string;
  label: string;
  showBadge?: boolean;
}

const navItems: NavItem[] = [
  {
    href: '/',
    icon: 'home',
    label: 'Accueil'
  },
  {
    href: '/offices',
    icon: 'search',
    label: 'Rechercher'
  },
  {
    href: '/offices/create',
    icon: 'add_box',
    label: 'Annonces'
  },
  {
    href: '/messages',
    icon: 'mail',
    label: 'Contact',
    showBadge: true
  }
];

export default function BottomNav() {
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 pb-3 pt-2">
      <div className="flex">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const badgeCount = item.showBadge ? unreadCount : 0;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className="flex flex-1 flex-col items-center justify-center gap-1 relative group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <span 
                  className={`material-symbols-outlined transition-colors duration-200 ${
                    active 
                      ? 'text-french-tech-blue' 
                      : 'text-gray-600 group-hover:text-french-tech-blue'
                  }`}
                >
                  {item.icon}
                </span>
                
                {/* Badge de notifications */}
                {badgeCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-french-tech-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {badgeCount > 9 ? '9+' : badgeCount}
                  </motion.div>
                )}
              </motion.div>
              
              <p 
                className={`text-xs transition-all duration-200 ${
                  active 
                    ? 'font-bold text-french-tech-blue' 
                    : 'font-medium text-gray-600 group-hover:text-french-tech-blue'
                }`}
              >
                {item.label}
              </p>
              
              {/* Indicateur actif */}
              {active && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-french-tech-blue rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
