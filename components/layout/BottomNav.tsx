'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Accueil',
      icon: 'home',
      active: pathname === '/'
    },
    {
      href: '/offices',
      label: 'Rechercher',
      icon: 'search',
      active: pathname.startsWith('/offices') && pathname !== '/offices/create'
    },
    {
      href: '/offices/create',
      label: 'Annonces',
      icon: 'add_business',
      active: pathname === '/offices/create'
    },
    {
      href: '/contact',
      label: 'Contact',
      icon: 'contact_support',
      active: pathname === '/contact'
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center py-3 px-4 min-w-0 flex-1 transition-colors duration-200 ${
              item.active
                ? 'text-french-tech-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="material-symbols-outlined text-2xl mb-1">
              {item.icon}
            </span>
            <span className="text-xs font-medium truncate">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
